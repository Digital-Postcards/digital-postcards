const fs = require("fs");
const express = require('express');
const cors = require("cors")
const app = express();
let serverThing = [];
app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}))
app.get('/getlistoffiles', (req, res)=>{
    readFiles(res);
})
app.get("/locations", (req, res) => {
  fs.readFile("resources/mapselectors.json", function (err, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    return res.end();
  });
});

app.get("/postcardMarkers", (req, res) => {
  fs.readFile("resources/postcardMarkers.json", function (err, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    return res.end();
  });
});

app.get("/tradecardMarkers", (req, res) => {
    fs.readFile("resources/tradecardMarkers.json", function (err, data) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(data);
      return res.end();
    });
  });

app.get("/getPostcardByNumber", (req, res) => {
  res.send(serverThing.find((x) => req.query.num === x.id));
});

app.listen(8000, ()=>{ console.log("Got a request")});

function createJSON(){
  fs.readdir(__dirname+"/Trade Cards and Post Cards/Post Cards/", function(err, filenames){
      console.log(filenames);
      if(err)
          console.log("Error");
      else{
          let asyncCounter = filenames.length; //Each time you finish reading the file, decrease by 1 till it reaches 0
          let dataArray = [];
          filenames.forEach((fileName)=>{
              fs.readFile(__dirname+"/Trade Cards and Post Cards/Post Cards/" + fileName,{encoding:"base64"}, (err, data)=>{
                  if(err)
                      console.log("Error read file");
                  dataArray.push({filePath:fileName,picData:"data:image/jpg;base64," + data});
                  --asyncCounter === 0 && mapToJSON(dataArray);
              });
          })
      }
       
  })
}

function readFiles(resolver){
    fs.readdir(__dirname+"/Trade Cards and Post Cards/Post Cards/", function(err, filenames){
        if(err)
            console.log("Error");
        else{
            let asyncCounter = filenames.length; //Each time you finish reading the file, decrease by 1 till it reaches 0
            let dataArray = [];
            filenames.forEach((fileName)=>{
                fs.readFile(__dirname+"/Trade Cards and Post Cards/Post Cards/" + fileName,{encoding:"base64"}, (err, data)=>{
                    if(err)
                        console.log("Error read file");
                    dataArray.push("data:image/jpg;base64," + data);
                    --asyncCounter === 0 && mapToJSON(dataArray, resolver);
                });
            })
        }
         
    })
}
function mapToJSON(dataArray){
  dataArray = dataArray.sort(function(a,b){return ((a.filePath.length - b.filePath.length)* 99) + (a.filePath).localeCompare(b.filePath)});
  for(let i = 1; i < dataArray.length; i=i+2){
      serverThing.push({id:""+(i+1)/2, name:dataArray[i-1].filePath,imageFront:dataArray[i-1].picData, imageBack: dataArray[i].picData, censor: true});
      console.log(i);
  }
  fs.writeFile("./postcardDatabase.json", JSON.stringify(serverThing, null, 1),(err)=>{
      if (err)
          console.log("Write Error")
  })
}

createJSON();
