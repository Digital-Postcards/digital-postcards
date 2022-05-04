const fs = require("fs");
const docxParser = require("docx-parser")
const locations = [
  "Oxford",
  "London",
  "Manchester",
  "Leeds",
  "Sheffield",
  "Ashford",
];
function JSONStartInitiate(){
  //Location Add
  const read_path = "./locations_processed.txt";
  const reader = require("line-reader");
  reader.eachLine(read_path, (line, last) => {
    let data = line.split(",");
    coordinates[data[0]] = [data[1], data[2]];
  });
  //postcardDatabase.json populate
  imageToArray(__dirname+"/Trade Cards and Post Cards/Post Cards/").then((imageArray)=>{
    testTSVStuff(__dirname+"/Info spreadsheet - Sheet1.tsv").then((metadataArray)=>{
      postcardMapToJSON(imageArray,metadataArray,__dirname+"/postcardDatabase.json")
    })
  })
}

let coordinates = {};

// Learned that directories just show up as strings in there. So if we have a directory
// of all sub directories, then you can use that for major classification!

// function testStuff(){
//   fs.readdir(__dirname+"/Trade Cards and Post Cards/", function(err, filenames){
//     console.log(filenames);
//   });
// }
function testDOCX(){
  docxParser.parseDocx(__dirname+"/705.docx",function(data){
    console.log(typeof data);
  })
}
function testTSVStuff(fileName){
  return new Promise(function(resolve,reject){
    fs.readFile(fileName, 'utf8', function (err, data) {
      if(err){
        console.log(err);
        reject(err);
      }
      var dataArray = data.split(/\r?\n/);
      dataArray.shift();
      resolve(dataArray.map((x)=>x.split("\t")))
    });
  })
}
function imageToArray(directoryName, callbackFunction){
  return new Promise(function(resolve, reject){
    fs.readdir(directoryName, function(err, filenames){
      if(err)
          reject(err);
      else{
          Promise.all(filenames.sort(sortFiles).map(async (fileName)=>{
              return {filePath:fileName, picData:"data:image/jpg;base64," + (await readFilePromise(fileName,directoryName))
            }
          })).then((x)=>resolve(x));
      }
       
  })
   
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
function postcardMapToJSON(dataArray, metadataArray, writeFileName){
  let serverThing = [];
  for(let i = 1; i < dataArray.length; i=i+2){
    let imageMeta = metadataArray[((i+1)/2)-1];
    serverThing.push({id:(i+1)/2, data:{
      value: {imageFront:dataArray[i-1].picData, imageBack: dataArray[i].picData},
      //Postcard Metadata
      postmarked: imageMeta[1], location:imageMeta[2], tagData: 
      [imageMeta[3],imageMeta[4],imageMeta[5],imageMeta[6],imageMeta[7],imageMeta[8],imageMeta[9],imageMeta[10],imageMeta[11]].filter((tag)=>tag !== ""),
      carouselOkay: imageMeta[12]==="Yes" 
    },
    name:dataArray[i-1].filePath});
  }
  fs.writeFile(__dirname+"/"+writeFileName, JSON.stringify(serverThing, null, 1),(err)=>{
      if (err)
          console.log("Write Error")
  })
}
function testingStuff(dataArray, writeFileName){
  dataArray = dataArray.map((x)=>x.picData)
  let serverThing = {
    value:{
      imageFront:dataArray[0],
      imageBack:dataArray[1]
    },
    up:{
      value:{
        imageFront:dataArray[2],
        imageBack:dataArray[3]
      }
    },
    left:{
      value:{
        imageFront:dataArray[4],
        imageBack:dataArray[5]
      }
    },
    down:{
      value:{
        imageFront:dataArray[6],
        imageBack:dataArray[7]
      }
    }
  };
  fs.writeFile(__dirname+"/"+writeFileName, JSON.stringify(serverThing, null, 1),(err)=>{
      if (err)
          console.log("Write Error")
  })
}
JSONStartInitiate();
