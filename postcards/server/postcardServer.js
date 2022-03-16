const express = require('express')
const app = express();
const port = 8000;
app.use(express.json());
app.get('/randomfiveforcarousel', (req, res)=>{
    console.log(typeof reqs);
})
app.listen(port, ()=>{ console.log("Got a request")});