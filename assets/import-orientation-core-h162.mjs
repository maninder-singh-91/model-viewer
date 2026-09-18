// Exact-position connectivity is used only for orientation analysis. Render
// vertices are never welded, so UV seams and authored hard edges stay intact.
export function orientationBudgetH162(vertices,indices){
 let slots=1;while(slots<vertices*2)slots*=2;
 return {slots,bytes:vertices*56+indices*8+indices/3*5+slots*4};
}
export function correctOrientationH162({positions,normals,indices,maxBytes=256*1048576}){
 const start=performance.now(),vertices=positions.length/3,faces=indices.length/3;
 const budget=orientationBudgetH162(vertices,indices.length);
 if(!Number.isInteger(vertices)||!Number.isInteger(faces)||normals.length!==positions.length)throw Error('Invalid triangle attributes');
 if(budget.bytes>maxBytes)throw Error('Orientation analysis exceeds its memory budget');
 const remap=new Uint32Array(vertices),slots=new Uint32Array(budget.slots),bits=new Uint32Array(positions.buffer,positions.byteOffset,positions.length);
 const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
 for(let i=0;i<vertices;i++){
  for(let axis=0;axis<3;axis++){const x=positions[i*3+axis];if(!Number.isFinite(x))throw Error('Non-finite position');min[axis]=Math.min(min[axis],x);max[axis]=Math.max(max[axis],x);}
  const x=positions[i*3]===0?0:bits[i*3],y=positions[i*3+1]===0?0:bits[i*3+1],z=positions[i*3+2]===0?0:bits[i*3+2];
  let h=(Math.imul(x,73856093)^Math.imul(y,19349663)^Math.imul(z,83492791))>>>0;h^=h>>>16;h=Math.imul(h,0x7feb352d);h^=h>>>15;h>>>=0;
  let slot=h&(budget.slots-1),probes=0;
  while(slots[slot]){const old=slots[slot]-1;if(positions[old*3]===positions[i*3]&&positions[old*3+1]===positions[i*3+1]&&positions[old*3+2]===positions[i*3+2])break;if(++probes>256)throw Error('Ambiguous position connectivity');slot=(slot+1)&(budget.slots-1);}
  if(!slots[slot])slots[slot]=i+1;remap[i]=slots[slot]-1;
 }
 const head=new Int32Array(vertices).fill(-1),next=new Int32Array(indices.length),degree=new Uint32Array(vertices);
 for(let corner=0;corner<indices.length;corner++){const vertex=indices[corner];if(vertex>=vertices)throw Error('Triangle index out of bounds');const welded=remap[vertex];next[corner]=head[welded];head[welded]=corner;degree[welded]++;}
 const parity=new Int8Array(faces),queue=new Uint32Array(faces),components=[];
 const origin=min.map((x,i)=>(x+max[i])*.5);let count=0;
 for(let seed=0;seed<faces;seed++){
  if(parity[seed])continue;
  if(components.length>=4096)throw Error('Orientation component budget exceeded');
  const component={start:count,end:0,closed:true,valid:true,volume:0,min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity]};
  parity[seed]=1;queue[count++]=seed;
  for(let cursor=component.start;cursor<count;cursor++){
   const face=queue[cursor],offset=face*3;
   for(let edge=0;edge<3;edge++){
    const a=remap[indices[offset+edge]],b=remap[indices[offset+(edge+1)%3]];
    if(a===b){component.valid=false;continue;}
    const vertex=degree[a]<=degree[b]?a:b;
    if(degree[vertex]>128){component.valid=false;component.closed=false;continue;}
    let matches=0;
    for(let corner=head[vertex];corner!==-1;corner=next[corner]){
     const other=Math.floor(corner/3);if(other===face)continue;
     let same=0;
     for(let k=0;k<3;k++){const u=remap[indices[other*3+k]],v=remap[indices[other*3+(k+1)%3]];if(u===a&&v===b)same=1;else if(u===b&&v===a)same=-1;}
     if(!same)continue;matches++;
     const orientation=-same*parity[face];
     if(!parity[other]){parity[other]=orientation;queue[count++]=other;}
     else if(parity[other]!==orientation)component.valid=false;
    }
    if(matches!==1){component.closed=false;if(matches>1)component.valid=false;}
   }
   const ia=indices[offset]*3,ib=indices[offset+1]*3,ic=indices[offset+2]*3;
   const ax=positions[ia]-origin[0],ay=positions[ia+1]-origin[1],az=positions[ia+2]-origin[2],bx=positions[ib]-origin[0],by=positions[ib+1]-origin[1],bz=positions[ib+2]-origin[2],cx=positions[ic]-origin[0],cy=positions[ic+1]-origin[1],cz=positions[ic+2]-origin[2];
   component.volume+=parity[face]*(ax*(by*cz-bz*cy)+ay*(bz*cx-bx*cz)+az*(bx*cy-by*cx));
   for(let corner=0;corner<3;corner++){const i=indices[offset+corner]*3;for(let axis=0;axis<3;axis++){component.min[axis]=Math.min(component.min[axis],positions[i+axis]);component.max[axis]=Math.max(component.max[axis],positions[i+axis]);}}
  }
  component.end=count;components.push(component);
 }
 let flippedFaces=0,closedShells=0,ambiguousShells=0;
 for(const c of components){
  // Contained bounds can represent cavity surfaces. Keep those authored rather
  // than forcing every disconnected shell outward and filling intentional holes.
  const nested=components.length>512||components.some(other=>other!==c&&other.closed&&other.valid&&c.min.every((x,i)=>x>=other.min[i])&&c.max.every((x,i)=>x<=other.max[i]));
  const scale=Math.max(...c.max.map((x,i)=>x-c.min[i]));
  if(!c.closed||!c.valid||nested||Math.abs(c.volume)<=scale**3*1e-12){ambiguousShells++;continue;}
  closedShells++;const direction=c.volume<0?-1:1;
  for(let cursor=c.start;cursor<c.end;cursor++)if(parity[queue[cursor]]*direction<0){const offset=queue[cursor]*3,temp=indices[offset+1];indices[offset+1]=indices[offset+2];indices[offset+2]=temp;flippedFaces++;}
 }
 const accumulated=new Float32Array(positions.length);
 for(let offset=0;offset<indices.length;offset+=3){
  const a=indices[offset]*3,b=indices[offset+1]*3,c=indices[offset+2]*3;
  const ux=positions[b]-positions[a],uy=positions[b+1]-positions[a+1],uz=positions[b+2]-positions[a+2],vx=positions[c]-positions[a],vy=positions[c+1]-positions[a+1],vz=positions[c+2]-positions[a+2];
  const x=uy*vz-uz*vy,y=uz*vx-ux*vz,z=ux*vy-uy*vx;
  accumulated[a]+=x;accumulated[a+1]+=y;accumulated[a+2]+=z;
  accumulated[b]+=x;accumulated[b+1]+=y;accumulated[b+2]+=z;
  accumulated[c]+=x;accumulated[c+1]+=y;accumulated[c+2]+=z;
 }
 const changed=new Uint32Array(vertices);let flippedNormals=0,repairedNormals=0;
 for(let i=0;i<vertices;i++){
  const offset=i*3,x=accumulated[offset],y=accumulated[offset+1],z=accumulated[offset+2],length=Math.hypot(x,y,z);if(length<1e-30)continue;
  const nx=normals[offset],ny=normals[offset+1],nz=normals[offset+2],normalLength=Math.hypot(nx,ny,nz);
  if(!Number.isFinite(normalLength)||normalLength<1e-20){normals[offset]=x/length;normals[offset+1]=y/length;normals[offset+2]=z/length;repairedNormals++;}
  else if(nx*x+ny*y+nz*z<-.25*normalLength*length){normals[offset]=-nx;normals[offset+1]=-ny;normals[offset+2]=-nz;changed[flippedNormals++]=i;}
 }
 return {indices:flippedFaces?indices:null,normals:flippedNormals||repairedNormals?normals:null,flippedVertices:changed.slice(0,flippedNormals),stats:{vertices,faces,flippedFaces,flippedNormals,repairedNormals,closedShells,ambiguousShells,estimatedPeakBytes:budget.bytes,ms:performance.now()-start}};
}
