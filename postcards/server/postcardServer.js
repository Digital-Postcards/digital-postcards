const Model = require("./model.js")
const fs = require("fs")
const express = require('express');
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}))
let modelObj = null;
app.listen(8000,()=>{
  modelObj = new Model(JSON.parse(fs.readFileSync("../postcardDatabase.json")))})
app.get("/locations", (req, res) => {
  fs.readFile("resources/mapselectors.json", function (err, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    return res.end();
  });
});
app.get('/randomPostcards', (req, res)=>{
  let uniqueRandomNumbers = new Set();
  while(uniqueRandomNumbers.size < req.query.num){
      uniqueRandomNumbers.add(Math.floor(Math.random() * modelObj.getLength()));
  }
  res.send(Array.from(uniqueRandomNumbers).map((x)=>modelObj.getPostcardFromID(x)));
})

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
  res.send(modelObj.getPostcardFromID(req.query.num));
});