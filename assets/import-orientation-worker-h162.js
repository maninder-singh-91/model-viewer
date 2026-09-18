import {correctOrientationH162} from './import-orientation-core-h162.mjs';
self.onmessage=({data})=>{
 try{const result=correctOrientationH162(data),transfer=[result.flippedVertices.buffer];if(result.indices)transfer.push(result.indices.buffer);if(result.normals)transfer.push(result.normals.buffer);self.postMessage(result,transfer);}
 catch(error){self.postMessage({error:error.message});}
};
