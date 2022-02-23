import React, { Fragment } from "react";
import "./home.css"
import banner from "../resources/placeholder.jpg";
import image1 from "../resources/Post Cards/Ayahs/1A.jpg";
import image2 from "../resources/Post Cards/Ayahs/1B.jpg";
import image3 from "../resources/Post Cards/Ayahs/2A.jpg";
import image4 from "../resources/Post Cards/Ayahs/2B.jpg";
import PostcardCarousel from "../components/carouselWrapper";


function Home(){
    var imageList = [image1, image2, image3, image4];
    return (
        <Fragment>
            {/**************************** Banner **************************************/}
            <img src={banner} alt="Banner didn't load! Please try again"></img>
            {/**************************** Carousel **************************************/}
            <PostcardCarousel imageList={imageList}/>
        </Fragment>

    )
}
export default Home;