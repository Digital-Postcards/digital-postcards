const fs = require("fs");
const request = require("request");

const read_path = "./locations.txt";
const write_path = "./locations_processed.txt";

const reader = require("line-reader");
const writer = fs.createWriteStream(write_path);

const API_KEY = "80693a2efee0281d399343e35bef9d5e";
const base_URL = "https://geokeo.com/geocode/v1/search.php?q=";

reader.eachLine(read_path, (line, last) => {
  let query = line.trim();
  let url = base_URL + query + "&api=" + API_KEY;

  request(
    {
      url: url,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        if (body.status == "ok") {
          let lat = body.results[0].geometry.location.lat;
          let lng = body.results[0].geometry.location.lng;
          writer.write(query + "," + lat + "," + lng + "\n");
        }
      }
    }
  );
});
