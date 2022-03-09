import React from "react";
import "../styles/home.css"
import banner from "../resources/banner.jpg";
import CustomPostcardCarousel from "../components/reactCarouselWrapper";
import "../resources/fakeBackendModel.js"
import {NavLink} from "react-router-dom";
import PostcardDatabase, { generateRandomFive } from "../resources/fakeBackendModel.js";

function Home(){ //Does it need it's own state?
    let postcardDatabase = new PostcardDatabase(); 
    //Using Axios to call that server (using GET method) -> Node.js needs to handle the GET request via Express/Node.js
    return (
        <div className="home"> {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
            {/**************************** Banner **************************************/}
            {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
            <div className="bannerCrop">
                <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img>
            </div>
            {/**************************** Carousel **************************************/}
            <CustomPostcardCarousel imageList={(postcardDatabase.generateSameFiveForTesting()).concat(postcardDatabase.generateSameFiveForTesting()).map((x)=>x.imageFront)}/> 
        </div>

    )
}
export default Home;