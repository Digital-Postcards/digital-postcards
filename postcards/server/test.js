const axios = require('axios');
axios.get("http://localhost:8000/getlistoffiles").then((res)=>console.log(res));