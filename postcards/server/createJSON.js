const fs = require("fs");
const docxParser = require("docx-parser")
function JSONStartInitiate(){
  imageToArray(__dirname+"/Trade Cards and Post Cards/Post Cards/").then((imageArray)=>{
<<<<<<< Updated upstream
    testTSVStuff(__dirname+"/Info spreadsheet - Sheet1.tsv").then((metadataArray)=>{
      postcardMapToJSON(imageArray,metadataArray,__dirname+"/postcardDatabase.json")
=======
    parseTSV(__dirname+"/Info spreadsheet - Sheet1.tsv").then((metadataArray)=>{
      postcardMapToJSON(imageArray,metadataArray,"postcardDatabase.json")
>>>>>>> Stashed changes
    })
  })
    imageToArray(__dirname+"/501 RISING SUN STOVE/").then((imageArray)=>{
      testingStuff(imageArray,"Rising Sun.json")
    })
    testDOCX();
}
// Learned that directories just show up as strings in there. So if we have a directory
// of all sub directories, then you can use that for major classification!

// function testStuff(){
//   fs.readdir(__dirname+"/Trade Cards and Post Cards/", function(err, filenames){
//     console.log(filenames);
//   });
// }
// function testDOCX(){
//   docxParser.parseDocx(__dirname+"/705.docx",function(data){
//     console.log(typeof data);
//   })
// }
function imageToArray(directoryName){
  return new Promise(function(resolve, reject){
    fs.readdir(directoryName, function(err, filenames){
      if(err)
          reject(err);
      else{
        let processedFileArray = processFileNames(filenames);
        Promise.all(processedFileArray.map((postcardCollection)=>{
          return Promise.all(postcardCollection.map(async (fileName)=>{
            return {filePath:fileName, picData:"data:image/jpg;base64," + (await readFilePromise(fileName,directoryName))
          }
        }))
        })).then((x)=>{
          x.shift();
          resolve(x)});
      }       
  })
   
  })
}
function processFileNames(fileNameArray){
  let result = []
  fileNameArray.forEach((x)=>{
    let index = parseInt(x.substring(0,x.length - 1));
    if(result[index] === undefined)
      result[index] = [];
    result[index].push(x);
  })
  return result;
}
function readFilePromise(fileName,directoryName){
  return new Promise(function(resolve, reject){
    fs.readFile(directoryName + fileName,{encoding:"base64"},function(err,data){
      if(err){  reject(err) }
      else{  resolve(data)  }
    })
  })
}
function parseTSV(fileName){
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
function postcardMapToJSON(dataArray, metadataArray, writeFileName){
  let serverThing = [];
<<<<<<< Updated upstream
  for(let i = 1; i < dataArray.length; i=i+2){
    let imageMeta = metadataArray[((i+1)/2)-1];
    serverThing.push({id:(i+1)/2, data:{
      value: {imageFront:dataArray[i-1].picData, imageBack: dataArray[i].picData},
=======
  for(let i = 0; i < dataArray.length; i++){
    if(dataArray[i]===undefined)
      continue;
    let imageMeta = metadataArray[i];
    let location = locations[Math.floor(Math.random() * locations.length)];
    serverThing.push({id:i+1, data:{
      value: {imageFront:dataArray[i][0], imageBack: dataArray[i][1]},
      // lat: coordinates[location][0],
      // lng: coordinates[location][1],
>>>>>>> Stashed changes
      //Postcard Metadata
      postmarked: imageMeta[1], location:imageMeta[2], tagData: 
      [imageMeta[3],imageMeta[4],imageMeta[5],imageMeta[6],imageMeta[7],imageMeta[8],imageMeta[9],imageMeta[10],imageMeta[11]].filter((tag)=>tag !== ""),
      carouselOkay: imageMeta[12]==="Yes" 
    }});
  }
  fs.writeFile(__dirname+"/"+writeFileName, JSON.stringify(serverThing, null, 1),(err)=>{
<<<<<<< Updated upstream
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
JSONStartInitiate()
=======
    if (err)
      console.log(err)
  })
}
function transcriptParsing(){
  fs.readdir(__dirname+"/Transcripts/", function(err,filenames){
    filenames.forEach((x)=>{
      console.log(x);
      docxParser.parseDocx(__dirname+"/Transcripts/"+x,function(data){
        let parsingData = data.split("\n")
        console.log(parsingData[6]);
      })
    })
  })
}
transcriptParsing();
//JSONStartInitiate();

>>>>>>> Stashed changes
