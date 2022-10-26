const Model = require("./server/model.js");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const reader = require("line-reader");
const path = require("path")

const app = express();
const port = process.env.PORT || 5000;
let modelObj = null;
let tags = [];  // store all tags
const read_path = __dirname + "/server/tags.txt"; // file to read tags from
let mapselectors = null;

app.use(express.static(path.join(__dirname, '/build')))

app.listen(port, () => {
  modelObj = new Model(JSON.parse(fs.readFileSync(__dirname + "/server/postcardDatabase.json")));
  reader.eachLine(read_path, (line, last) => {
    tags.push(line.trim())
  });
  mapselectors = JSON.parse(fs.readFileSync("./server/resources/mapselectors.json"));
  console.log("DB Started at port " + port);
});

app.get("/getAll", (req, res) => {
  return res.json(modelObj.array.filter((card)=>card !== null));
});

app.get("/getTags", (req, res) => {
  return res.json(tags);
});

app.get("/locations", (req, res) => {
  return res.json(mapselectors)
});

// app.get("/randomPostcards", (req, res) => {
//   let uniqueRandomNumbers = new Set();
//   while (uniqueRandomNumbers.size < req.query.num) {
//     uniqueRandomNumbers.add(Math.floor(Math.random() * modelObj.getLength()));
//   }
//   res.send(
//     Array.from(uniqueRandomNumbers).map((x) => modelObj.getPostcardFromID(x))
//   );
// });

// reading from sample files, no longer necessary

// app.get("/postcardMarkers", (req, res) => {
//   fs.readFile("resources/postcardMarkers.json", function (err, data) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(data);
//     return res.end();
//   });
// });

// app.get("/tradecardMarkers", (req, res) => {
//   fs.readFile("resources/tradecardMarkers.json", function (err, data) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(data);
//     return res.end();
//   });
// });

app.get("/getPostcardByNumber", (req, res) => {
  res.send(modelObj.getPostcardFromID(req.query.num));
});
app.get("*", (req,res)=>{
  res.sendFile(__dirname + "/build/index.html");
})
