const express = require( 'express');
const cors = require ('cors');
const fs = require ('fs');

const app = express();
const port = 8000;

var corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));

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

app.listen(port, () => {
  console.log(`Postcard app listening on port ${port}`);
});
