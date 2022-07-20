// const axios = require('axios');
// axios.get("http://localhost:8000/getlistoffiles").then((res)=>console.log(res));


/*
let testFile = filenames[0];
            fs.readFile(__dirname+"/Trade Cards and Post Cards/Post Cards/" + testFile,{encoding:"base64"}, (err, data)=>{
                if(err)
                    console.log("Error read file");
                resolver.send("data:image/jpg;base64," + data);
            });
*/
/*
function readCurdir(dir, callback){
  var tmpArray = []; 

  fs.readdir(dir, function(err, files) {
    if (err) {
      return console.log(err);
    }

    var counter = files.length;

    files.forEach(function(file) {
      fs.stat(path.join(dir, file), function(err, stats) {
        if (err) {
          console.log(err);
        }
        else if (stats.isFile()) {
          tmpArray.push(file); 
        }

        --counter === 0 && callback(tmpArray);
      }); 
    });
  }); 
} 
*/