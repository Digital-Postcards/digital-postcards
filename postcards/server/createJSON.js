const fs = require("fs");
const express = require('express');
const app = express();
app.use(express.json());
app.get('/getlistoffiles', (req, res)=>{
    res.send(readFiles());
})
app.listen(8000, ()=>{ console.log("Got a request")});
require("fs");
function readFiles(){
    fs.readdir(__dirname+"/Trade Cards and Post Cards/Post Cards/", function(err, filenames){
        var JSONArray = [];
        if(err){
            console.log("Error retrieving files");
            return;
        }
        JSONArray = filenames.map(function(fileName){
            return fs.readFile(__dirname+"/Trade Cards and Post Cards/Post Cards/"+fileName,function(err,content){
                if(err){
                    console.log("Error processing");
                }
                return content;
                /*let buffer = Buffer.from(JSON.stringify(content));
                JSONArray.push(URL.createObjectURL(new Blob([buffer],{type:'image/jpeg'})));*/
            })
        });
        console.log(JSONArray.map((x)=>typeof(x.then((res)=>res))));
    })
}
readFiles();