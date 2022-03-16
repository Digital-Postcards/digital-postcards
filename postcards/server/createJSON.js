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
    let imageArray = [];
    fs.readdirSync(__dirname+"/Trade Cards and Post Cards/Post Cards/", function(err, filenames){
        if(err){
            console.log("Directory is not read")
            return;
        }
    console.log("HI");
        console.log(filenames);
        filenames.forEach((acc,fileName)=>{ 
            fs.readFileSync(fileName,{encoding:"base64"}, (err, data)=>{
                if(err){
                    console.log("Error getting files")
                    return;
                }
                const image = new Image();
                image.src='data:image/jpg;base64,'+data;
                imageArray.push(image)
            });
    })
    })
    return imageArray;
}