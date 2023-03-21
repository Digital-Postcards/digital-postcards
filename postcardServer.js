const Model = require("./server/model.js");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const reader = require("line-reader");
const path = require("path");
const { response } = require("express");
const corsOptions = {
  "origin": "*",
  optionsSuccessStatus: 200
}

const app = express();
const port = process.env.PORT || 3000;
let modelObj = null;
let modelObj2 = null;
let tags = [];  // store all tags
const read_path = __dirname + "/server/tags.txt"; // file to read tags from
let mapselectors = null;

{/*FOR HOSTING: Comment out the following line*/}
app.use(express.static(path.join(__dirname, '/build')))
app.use(express.static(path.join(__dirname, "server", "Trade Cards")))
app.use(express.static(path.join(__dirname, "server", "Post Cards")))

app.use(cors(corsOptions));

app.listen(port, () => {
  // modelObj = new Model(JSON.parse(fs.readFileSync(__dirname + "/server/postcardDatabase.json")));
  modelObj = new Model(JSON.parse(fs.readFileSync(__dirname + "/server/postcardDatabase.json")));
  modelArr = modelObj.array.filter((card) => ((card !== null) /*&& (card.data.description !== "") && (card.data.analysis !== "") && (card.data.location !== "")*/));

  modelObj2 = new Model(JSON.parse(fs.readFileSync(__dirname + "/server/tradecardDatabase.json")));
  modelArr2 = modelObj2.array.filter((card) => ((card !== null) /*&& (card.data.description !== "") && (card.data.analysis !== "") && (card.data.location !== "")*/));

  reader.eachLine(read_path, (line, last) => {
    tags.push(line.trim())
  });
  console.log(modelArr);
  {/*mapselectors = JSON.parse(fs.readFileSync("./server/resources/mapselectors.json"));
console.log("DB Started at port " + port);*/}
});

app.get("/getAll", (req, res) => {
  return res.json(modelArr);
});

app.get("/getAll2", (req, res) => {
  return res.json(modelArr2);
});

app.get("/getVerticalCarousel", (req, res) => {
  const photoMap = new Map();
  modelArr.forEach((card) => {
    photoMap.set(card.id, card);
  });
  verticalPhotos = [];
  verticalPhotos.push(photoMap.get(1));
  verticalPhotos.push(photoMap.get(101));
  verticalPhotos.push(photoMap.get(125));
  verticalPhotos.push(photoMap.get(150));
  verticalPhotos.push(photoMap.get(313));
  verticalPhotos.push(photoMap.get(339));
  verticalPhotos.push(photoMap.get(362));
  return res.json(verticalPhotos);
 });

 app.get("/getHorizontalPostcardCarousel", (req, res) => {
  const photoMap = new Map();
  modelArr.forEach((card) => {
    photoMap.set(card.id, card);
  });
  horizontalPhotos = [];
  horizontalPhotos.push(photoMap.get(308));
  horizontalPhotos.push(photoMap.get(257));
  horizontalPhotos.push(photoMap.get(308));
  horizontalPhotos.push(photoMap.get(257));
  horizontalPhotos.push(photoMap.get(308));
  horizontalPhotos.push(photoMap.get(257));
  horizontalPhotos.push(photoMap.get(308));
  return res.json(horizontalPhotos);
 });

 app.get("/getHorizontalTradecardCarousel", (req, res) => {
  const photoMap = new Map();
  modelArr2.forEach((card) => {
    photoMap.set(card.id, card);
  });
  horizontalPhotos = [];
  horizontalPhotos.push(photoMap.get(501));
  horizontalPhotos.push(photoMap.get(514));
  horizontalPhotos.push(photoMap.get(511));
  horizontalPhotos.push(photoMap.get(514));
  horizontalPhotos.push(photoMap.get(511));
  horizontalPhotos.push(photoMap.get(514));
  horizontalPhotos.push(photoMap.get(511));
  return res.json(horizontalPhotos);
 });

app.get("/getTags", (req, res) => {
  return res.json(tags);
});

{/*app.get("/locations", (req, res) => {
  return res.json(mapselectors)
});*/}

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

{/*FOR HOSTING: Comment out the following code block*/}
app.get("*", (req,res)=>{
   res.sendFile(__dirname + "/build/index.html");
 })

