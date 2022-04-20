const fs = require("fs");

function JSONStartInitiate(){
  //imageToArray(__dirname+"/Trade Cards and Post Cards/Post Cards/",postcardMapToJSON);
  imageToArray(__dirname+"/501 RISING SUN STOVE/",postcardMapToJSON);
}

function imageToArray(directoryName, callbackFunction){
  fs.readdir(directoryName, function(err, filenames){
      if(err)
          console.log(err);
      else{
          Promise.all(filenames.sort(sortFiles).map(async (fileName)=>{
              return {filePath:fileName, picData:"data:image/jpg;base64," + (await readFilePromise(fileName,directoryName))
            }
          })).then((x)=> callbackFunction(x))
      }
       
  })
}
function readFilePromise(fileName,directoryName){
  return new Promise(function(resolve, reject){
    fs.readFile(directoryName + fileName,{encoding:"base64"},function(err,data){
      if(err){  reject(err) }
      else{  resolve(data)  }
    })
  })
}
function sortFiles(b,a){
  return (parseInt(b.substring(0,b.length - 1))-parseInt(a.substring(0,a.length - 1)))*50 + (b.charCodeAt(b.length - 1) - a.charCodeAt(a.length - 1));
}
function postcardMapToJSON(dataArray){
  let serverThing = [];
  for(let i = 1; i < dataArray.length; i=i+2){
      serverThing.push({id:(i+1)/2, name:dataArray[i-1].filePath,imageFront:dataArray[i-1].picData, imageBack: dataArray[i].picData});
  }
  fs.writeFile("./postcardDatabase.json", JSON.stringify(serverThing, null, 1),(err)=>{
      if (err)
          console.log("Write Error")
  })
}
JSONStartInitiate()