const fs = require("fs");
const express = require('express');
const cors = require("cors")
const app = express();
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
  // res.send("Hello World!");
});

app.get("/markers", (req, res) => {
  fs.readFile("resources/markers.json", function (err, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    return res.end();
  });
  // res.send("Hello World!");
});

app.listen(8000, ()=>{ console.log("Got a request")});
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
function mapToJSON(dataArray, resolver){
    //JSON write this
    fs.writeFile("./postcardDatabase.json", JSON.stringify(dataArray.map((x,i)=>{return {image:x, name: "Name " + i};}), null, 1),(err)=>{
        if (err)
            console.log("Write Error")
    })
    resolver.send(dataArray);
}
