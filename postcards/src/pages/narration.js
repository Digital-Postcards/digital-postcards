import axios from "axios";
import React from "react";
import image1 from "./1B.jpg";
import PostcardPage from "./postcardPage";
function Narration(props){
    axios.get("http://localhost:8000/getlistoffiles").then((imgData)=>{
        let image = new Image();
        image.src = imgData.data;
        document.getElementById("root").appendChild(image);
    })
    return (<div className="tesing123"><PostcardPage databaseEntry={{frontImage: image1, description:"Hi", title:"Testing 123", time:"1823", publisher:"Something Publisher and Co.",location:"Here", subject:"History",size:"1920x1080",tagArray:["tag 1","tag 2","testing"]}}/></div>)
}
export default Narration;