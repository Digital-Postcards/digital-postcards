const fetch = require("node-fetch");
const fs = require("fs");

const read_path = __dirname + "/locations_extracted.txt";
const write_path = __dirname + "/locations_processed.txt";

const reader = require("line-reader");
const writer = fs.createWriteStream(write_path);

// can replace with desired API and API key
const API_KEY = "d306f40a55eb41b488c9101e6f73b44e";
const base_URL = "https://api.geoapify.com/v1/geocode/search?text=";

reader.eachLine(read_path, (line, last) => {
  let query = line.trim();
  let url = base_URL + encodeURIComponent(query) + "&format=json&apiKey=" + API_KEY;
  fetch(url)
    .then((res) => res.json())
    .then((geocoded) => {
      if (geocoded.results[0]) {
        let lat = geocoded.results[0].lat;
        let lng = geocoded.results[0].lon;
        writer.write(query + "\t" + lat + "\t" + lng + "\n");
      }
      else {
        console.log("Could not geocode for", query)
      }
    });
});
