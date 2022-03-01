import React, { Fragment } from "react";
import "./home.css"
import banner from "../resources/placeholder.jpg";
import image1 from "../resources/Post Cards/Ayahs/1A.jpg";
import image2 from "../resources/Post Cards/Ayahs/1B.jpg";
import image3 from "../resources/Post Cards/Ayahs/2A.jpg";
import image4 from "../resources/Post Cards/Ayahs/2B.jpg";
import PostcardCarousel from "../components/carouselWrapper";
import "../resources/fakeBackendModel.js"
import {NavLink} from "react-router-dom";
import { generateRandomFive } from "../resources/fakeBackendModel.js";

function Home(){ //Does it need it's own state?
    return (
        <div className="home"> {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
            {/**************************** Banner **************************************/}
            {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
            <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img>
            {/**************************** Carousel **************************************/}
            <PostcardCarousel className="carousel" imageList={generateRandomFive().map((x)=>x.imageFront)}/>
        </div>

    )
}
export default Home;