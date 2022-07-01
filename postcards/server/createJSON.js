const fs = require("fs");
const docxParser = require("docx-parser")

//Guess this entire thing will take 15 seconds to run
function JSONStartInitiate(){
  //postcardDatabase.json populate
  console.log(new Date().toString());
  imageToArray(__dirname+"/Trade Cards and Post Cards/Post Cards/").then((imageArray)=>{
    parseTSV(__dirname+"/Info spreadsheet - Sheet1.tsv").then((metadataArray)=>{
      locationPopulate().then((locationData)=>{
        transcriptParsing(__dirname+"/Transcripts/").then((descAnalysis)=>{
          descAnalysis.forEach((x)=>console.log(x))
          postcardMapToJSON(imageArray,metadataArray, locationData, descAnalysis, "postcardDatabase.json")
        })
      })
    })
  })
}
function locationPopulate(){
  return new Promise((resolve, reject)=>{
    let coordinates = {};
    //Location Add
    const read_path = __dirname + "/locations_processed.txt";
    const reader = require("line-reader");
    reader.eachLine(read_path, (line,last) => {
      let data = line.split("\t");
      // store coordinates of each location in a dictionary
      coordinates[data[0]] = [data[1], data[2]];
      if(last){
        resolve(coordinates);
      }
    });
  })
}
// Learned that directories just show up as strings in there. So if we have a directory
// of all sub directories, then you can use that for major classification!

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
function postcardMapToJSON(dataArray, metadataArray, coordinates, descriptionDictionary, writeFileName){
  let serverThing = [];
  for(let i = 0; i < dataArray.length; i++){
    if(dataArray[i]===undefined)
      continue;
    let imageMeta = metadataArray[i];
    let location = imageMeta[2];
    // in case location is not present in the dictionary, set it to USA. (default = USA)
    if (!(location in coordinates)) {
      location = "USA"
    }
    // props.image.data.value.imageFront
    serverThing.push({id:i+1, data:{
      value: {imageFront:dataArray[i][0].picData, imageBack: dataArray[i][1].picData},
      lat: coordinates[location][0],
      lng: coordinates[location][1],
      description: descriptionDictionary[i][0],
      analysis: descriptionDictionary[i][1],
      //Postcard Metadata
      postmarked: imageMeta[1], location:imageMeta[2], tagData: 
      [imageMeta[3],imageMeta[4],imageMeta[5],imageMeta[6],imageMeta[7],imageMeta[8],imageMeta[9],imageMeta[10],imageMeta[11]].filter((tag)=>tag !== ""),
      carouselOkay: imageMeta[12]==="Yes" 
    }});
  }
  try{
    fs.writeFileSync(__dirname+"/"+writeFileName, JSON.stringify(serverThing, null, 1));
    console.log("JSON creation done");
    console.log(new Date().toString());
  }catch(error){
    console.error(error);
  }
}
function transcriptParsing(directory){
  return new Promise((resolve, reject)=>{
    fs.readdir(directory, function(err,filenames){
      Promise.all(filenames.map((x)=>{
        return new Promise((resolve)=>{
          console.log(x);
          docxParser.parseDocx(__dirname+"/Transcripts/"+x,function(data){
            let startDescriptionIndex = -1, endDescriptionIndex = -1, endAnalysisIndex = -1;
            for(let i = 0; i <= data.length - 12; i++){
              if(data.substring(i, i+12) === "Description:"){
                  startDescriptionIndex = i + 12;
              }
              if(data.substring(i, i+9) === "Analysis:"){
                endDescriptionIndex = i;
              }
              if(data.substring(i,i+8) === "Message:"){
                endAnalysisIndex = i;
              }
            }
             resolve([data.substring(startDescriptionIndex, endDescriptionIndex).trimStart().trimEnd(), (endAnalysisIndex === -1)? data.substring(endDescriptionIndex+9).trimStart().trimEnd():data.substring(endDescriptionIndex+9, endAnalysisIndex).trimStart().trimEnd()]);
          })
        })
      })).then((x)=>{
        console.log(x);
        let finalThing = {};
        x.forEach((descAnalysis, i)=>{
          finalThing[parseInt(filenames[i].split(" ")[0])] = descAnalysis;
        })
        resolve(x)});
    })
  })
}
//JSONStartInitiate();
console.log(__dirname + "/Transcripts/"+"105 Postcard Abby.docx");
// fs.readFile(__dirname + "/Transcripts/"+"105 Postcard Abby.docx",(error,data)=>{
//   if(error){
//     console.error(error);
//   }
//   console.log(data);
// })
docxParser.parseDocx(__dirname+"/Transcripts/"+"1 Postcard George.docx",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"105 Postcard Abby.docx",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"111 Postcard Abby.docx",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"110 Postcard Abby.docx",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"102 Postcard Abby.docx",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"103 Postcard Abby.docx",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"",(data)=>{
  console.log(data);
})
docxParser.parseDocx(__dirname+"/Transcripts/"+"",(data)=>{
  console.log(data);
})