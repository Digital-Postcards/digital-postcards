const fs = require("fs");
const decompress = require("decompress");

//Guess this entire thing will take 15 seconds to run
async function JSONStartInitiate(){
  await postcardMapToJSON(
    await imageToArray(__dirname+"/Trade Cards and Post Cards/Post Cards/"),
    await parseTSV(__dirname+"/Info spreadsheet - Sheet1.tsv"),
    await locationPopulate(),
    await transcriptParsing(__dirname+"/Transcripts/"),
    "postcardDatabase.json")
  console.log("Done");
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
            return {filePath:fileName, picData:"data:image/jpg;base64," + (await readFilePromise(fileName,directoryName))}
          }))
        })).then((x)=>{x.shift(); resolve(x)});
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
    serverThing[i] = {id:i+1, data:{
      value: {imageFront:dataArray[i][0].picData, imageBack: dataArray[i][1].picData},
      lat: coordinates[location][0],
      lng: coordinates[location][1],
      description: (descriptionDictionary[i] === undefined)? "":descriptionDictionary[i][0],
      analysis: (descriptionDictionary[i] === undefined)? "":descriptionDictionary[i][1],
      //Postcard Metadata
      postmarked: imageMeta[1], location:imageMeta[2], tagData: 
      [imageMeta[3],imageMeta[4],imageMeta[5],imageMeta[6],imageMeta[7],imageMeta[8],imageMeta[9],imageMeta[10],imageMeta[11]].filter((tag)=>tag !== ""),
      carouselOkay: imageMeta[12]==="Yes" 
    }};
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
  //TODO: Find way to make this synchronous with 
  return new Promise((resolve, reject)=>{
    fs.readdir(directory, function(err,filenames){
      if(err){
        reject(err);
      }
      promisifyparseDocx(processTranscriptNames(filenames), directory).then(resolve);
    })
  })
}
function processTranscriptNames(fileNameArray){
  let result = [];
  let firstSpace = 0;
  fileNameArray.forEach((x)=>{
    for(let i = 0; i < x.length; i++){
      if(x.charAt(i) === " "){
        firstSpace = i;
        break;
      }
    }
    let index = parseInt(x.substring(0,firstSpace));
    if(result[index] === undefined)
      result[index] = x;
  })
  result.shift();
  return result;
}
async function promisifyparseDocx(fileName,directory){
  let array = [];
  for(let i = 0; i < fileName.length-2; i++){
    if(fileName[i] === undefined)
      continue;
    array[i] = parseDOCXText(await readDOCXContent(fileName[i],directory))
  }
  return array;
}
async function readDOCXContent(filename, directory){5       
  await decompress(directory + filename, 'dist'); //Puts the xml file in the dist folder
  const documentXML = fs.readFileSync('dist/word/document.xml', 'utf8');
  return documentXML.replace(/(<w:p )[\s\S]*?>/g,"\n<w:p").replace(/(<([^>]+)>)/ig, "");
}
function parseDOCXText(docxText){
  let startDescriptionIndex = -1, endDescriptionIndex = -1, endAnalysisIndex = -1;
  for(let i = 0; i <= docxText.length - 12; i++){
    if(docxText.substring(i, i+12) === "Description:"){
        startDescriptionIndex = i + 12;
    }
    if(docxText.substring(i, i+9) === "Analysis:"){
      endDescriptionIndex = i;
    }
    if(docxText.substring(i,i+8) === "Message:"){
      endAnalysisIndex = i;
    }
  }
  return [docxText.substring(startDescriptionIndex, endDescriptionIndex).trimStart().trimEnd(), (endAnalysisIndex === -1)? docxText.substring(endDescriptionIndex+9).trimStart().trimEnd():docxText.substring(endDescriptionIndex+9, endAnalysisIndex).trimStart().trimEnd()];
}
JSONStartInitiate();