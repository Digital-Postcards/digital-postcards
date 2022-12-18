const fs = require("fs");
const decompress = require("decompress");
const path = require("path")

/**
 * Main funciton to initiate postcardDatabase.json
 */
async function JSONPostcardStartInitiate(){
  await postcardMapToJSON(
    await imageToArray(__dirname+"/Post Cards"),
    await parseTSV(__dirname+"/parsed-info-sheet.tsv"),
    await locationPopulate(),
    await transcriptParsing(__dirname+"/Transcripts/"),
    "postcardDatabase.json")
  console.log("Done");
}
async function JSONTradecardStartInitiate(){
  await tradecardMapToJSON(
    await imageToArray(__dirname+"/Trade Cards"),
    await parseTSV(__dirname+"/parsed-info-sheet.tsv"),
    await locationPopulate(),
    await transcriptParsing(__dirname+"/Transcripts/"),
    "tradecardDatabase.json")
  console.log("Done");
}
/**
 * Reads locations_processed.txt and parses it to a collective JS Object
 * @returns A JS Object where the keys represent the string location and the value represents a length 2 array of double coordinates
 */
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
/**
 * Checks if specified path is a directory
 * @param {*} directory directory to check
 * @returns true if it is a directory, false if it isn't
 */
function isDirectory(directory){
  return fs.lstatSync(directory).isDirectory();
}
/**
 * Takes the base directory and searches for the images in the base directory and any subsequent directory. Puts the data into an array and returns the data
 * @param {string} directoryName The base directory of where you want to start looking for images
 * @returns An array of JSON where each json contains the file path and the picture data
 */
function imageToArray(directoryName){
  return new Promise(function(resolve, reject){
    let processedFolderArray = [];
    fs.readdir(directoryName, function(err, filenames){
      if(err)
          reject(err);
      else{
        let processedFileArray = processFileNames(filenames.filter((x)=>!isDirectory(path.join(directoryName,x))));
        processedFolderArray = filenames.filter((x)=>isDirectory(path.join(directoryName, x)));
        Promise.all(processedFileArray.map((postcardCollection)=>{
          return Promise.all(postcardCollection.map(async (fileName)=>{
            return {filePath:fileName, picData:"data:image/jpg;base64," + (await readFilePromise(fileName,directoryName))}
          }))
        })).then((returnedArray)=>{ //returnedArray currently holds all files in the folder
          if(processedFolderArray.length != 0){
              Promise.all(processedFolderArray.map(async (folderName)=>{
                  return await imageToArray(path.join(directoryName, folderName));
              })).then((combinedSubFolderFilesArray)=>{
                  resolve(combineLists(returnedArray,combinedSubFolderFilesArray.reduce(combineLists, [])));
              }).catch((err)=>{
                  console.log(err)
              })
          }
          else{
            resolve(returnedArray);
          }
      });
      }       
    })
  })
}
/**
 * @param {Array} fileNameArray Array of file names to parse as a string array
 * @returns Grouped list of file names together
 */
function processFileNames(fileNameArray){
  let result = []
  fileNameArray.forEach((x)=>{
    let index = parseInt(x);
    if(result[index] === undefined)
      result[index] = [];
    result[index].push(x);
  })
  return result;
}
/**
 * Takes the file name in the given directory and returns a promise of the base-64 encoded file.
 * @param {*} fileName Name of the file to be opened
 * @param {*} directoryName The directory that the file is in
 * @returns 
 */
function readFilePromise(fileName,directoryName){
  return new Promise(function(resolve, reject){
    fs.readFile(path.join(directoryName, fileName),{encoding:"base64"},function(err,data){
      if(err){  reject(err) }
      else{  resolve(data)  }
    })
  })
}
/**
 * Opens the TSV file and parses the file
 * @param {*} fileName Directory and file name of the TSV
 * @returns A promise of the processed data as part of the TSV
 */
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
/**********************Transcript Parsing Functions **********************************/
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
async function readDOCXContent(filename, directory){     
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
/****************************************************************************************/
function postcardMapToJSON(dataArray, metadataArray, coordinates, descriptionDictionary, writeFileName){
  dataArray.shift();
  let serverThing = [];
  for(let i = 0; i < dataArray.length; i++){
    if(dataArray[i]===undefined || dataArray[i][1] === undefined) /* For some reason, some images don't have back sides so we ignore them */
      continue;
    let imageMeta = metadataArray[i];
    //let location = imageMeta[2];
    // in case location is not present in the dictionary, set it to USA. (default = USA)
    /*if (!(location in coordinates)) {
      location = "USA"
    }
    */
    // props.image.data.value.imageFront
    serverThing[i] = {id:i+1, data:{
      value: {imageFront:dataArray[i][0].picData, imageBack: dataArray[i][1].picData},
      //lat: coordinates[location][0],
      //lng: coordinates[location][1],
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
function tradecardMapToJSON(dataArray, metadataArray, coordinates, descriptionDictionary, writeFileName){
  dataArray.shift();
  let serverThing = [];
  for(let i = 0; i < dataArray.length; i++){
    if(dataArray[i]===undefined || dataArray[i][1] === undefined || metadataArray[i] === undefined) /* For some reason, some images don't have back sides so we ignore them */
      continue;
    let imageMeta = metadataArray[i];
    //let location = imageMeta[2];
    // in case location is not present in the dictionary, set it to USA. (default = USA)
    /*if (!(location in coordinates)) {
      location = "USA"
    }
    */
    // props.image.data.value.imageFront
    serverThing[i] = {id:i+1, data:{
      value: dataArray[i].map((x)=>x.picData),
      //lat: coordinates[location][0],
      //lng: coordinates[location][1],
      description: (descriptionDictionary[i] === undefined)? "":descriptionDictionary[i][0],
      analysis: (descriptionDictionary[i] === undefined)? "":descriptionDictionary[i][1],
      //Postcard Metadata
      postmarked: imageMeta[1], location:imageMeta[2], tagData: 
      [imageMeta[3],imageMeta[4],imageMeta[5],imageMeta[6],imageMeta[7],imageMeta[8],imageMeta[9],imageMeta[10],imageMeta[11]].filter((tag)=>tag !== ""),
      carouselOkay: imageMeta[12]==="Yes" 
    }};
  }
  try{
    fs.writeFileSync(__dirname+"/"+writeFileName, JSON.stringify(serverThing.filter((x)=>x!=null), null, 1));
    console.log("JSON creation done");
    console.log(new Date().toString());
  }catch(error){
    console.error(error);
  }
}
function combineLists(list1, list2){
  let longerLength = Math.max(list1.length, list2.length);
  let returnedArray = [];
  for(let i = 0; i < longerLength; i++){
    if(list1[i] !== undefined){
      returnedArray[i] = list1[i]
    }
    else{
      returnedArray[i] = list2[i];
    }
  }
  return returnedArray;
}
JSONPostcardStartInitiate();
JSONTradecardStartInitiate();