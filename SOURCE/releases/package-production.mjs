import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';

// Package a validated H136 editor preview without publishing its settings UI.
const destination=path.resolve(import.meta.dirname,'../..');
const source=path.resolve(process.argv[2]||path.join(destination,'../J-Viewer-Model-View-H136'));
const hash=data=>createHash('sha256').update(data).digest('hex');
const views=JSON.parse(fs.readFileSync(new URL('h136-default-views.json',import.meta.url),'utf8'));
for(const [model,view] of Object.entries(views)){
 assert.match(model,/^[a-f0-9]{64}$/);
 for(const key of ['position','target','up'])assert.ok(Array.isArray(view[key])&&view[key].length===3&&view[key].every(Number.isFinite));
 assert.equal(view.version,1);assert.ok(view.fov>0&&view.fov<180&&view.zoom>0&&view.aspect>0);
}
const files=fs.readFileSync(path.join(source,'SHA256SUMS.txt'),'utf8').trim().split('\n').map(line=>{
 const [checksum,file]=line.split('  ');assert.equal(hash(fs.readFileSync(path.join(source,file))),checksum);return file;
});
let html=fs.readFileSync(path.join(source,'index.html'),'utf8');
const previous=html.match(/src="\.\/(assets\/viewer-[a-f0-9]+\.js)"/)[1];
let js=fs.readFileSync(path.join(source,previous),'utf8');
const storage="let view=null;\n    try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(validModelViewH136(saved))view=saved;}catch{}";
assert.equal(js.split(storage).length,2,'Expected the H136 saved-view loader');
js=js.replace(storage,'let view=deploymentModelViewsH136[model.sha256]||null;');
js=js.replace('const modelViewsH136={entries:new WeakMap(),error:\'\'};',()=>`const deploymentModelViewsH136=${JSON.stringify(views)};\nconst modelViewsH136={entries:new WeakMap(),error:''};`);
const check=spawnSync(process.execPath,['--input-type=module','--check'],{input:js,encoding:'utf8'});assert.equal(check.status,0,check.stderr);
const asset='assets/viewer-'+hash(js).slice(0,12)+'.js';
html=html.replace('<html lang="en">','<html lang="en" class="deployment-h88">').replace(previous,asset)
 .replace(/<title>[^<]+<\/title>/,'<title>J Viewer | Jewellery Model Viewer</title>')
 .replace(/(<meta name="j-viewer-build" content=")[^"]+/, '$12.19-H136-production');
assert.ok(html.includes('<html lang="en" class="deployment-h88">'));
assert.ok(html.includes('html.deployment-h88 #v213SidebarTab'));
for(const file of files.filter(file=>!['index.html','service-worker.js',previous].includes(file))){
 fs.mkdirSync(path.dirname(path.join(destination,file)),{recursive:true});fs.copyFileSync(path.join(source,file),path.join(destination,file));
}
fs.writeFileSync(path.join(destination,asset),js);fs.writeFileSync(path.join(destination,'index.html'),html);
const releaseFiles=files.map(file=>file===previous?asset:file),core=['./',...releaseFiles.map(file=>'./'+file).filter(file=>file!=='./service-worker.js')];
const sw=fs.readFileSync(path.join(source,'service-worker.js'),'utf8')
 .replace(/const CACHE=PREFIX\+'[^']+';/,"const CACHE=PREFIX+'h136-production-"+hash(html).slice(0,12)+"';")
 .replace(/const CORE=\[[^\n]+\];/,'const CORE='+JSON.stringify(core)+';');
fs.writeFileSync(path.join(destination,'service-worker.js'),sw);
fs.writeFileSync(path.join(destination,'SHA256.txt'),releaseFiles.map(file=>hash(fs.readFileSync(path.join(destination,file)))+'  '+file).join('\n')+'\n');
console.log(JSON.stringify({asset,bakedModels:Object.keys(views),settingsHidden:true}));
