const fs = require("fs");
const express = require('express');
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}))
app.get('/getlistoffiles', (req, res)=>{
    readFiles(res);
})
app.listen(8000, ()=>{ console.log("Got a request")});
function readFiles(resolver){
    fs.readdir(__dirname+"/Trade Cards and Post Cards/Post Cards/", function(err, filenames){
        if(err)
            console.log("Error");
        else{
            let testFile = filenames[0];
            fs.readFile(__dirname+"/Trade Cards and Post Cards/Post Cards/" + testFile,{encoding:"base64"}, (err, data)=>{
                if(err)
                    console.log("Error read file");
                resolver.send("data:image/jpg;base64," + data);
            });
        }
         
    })
}