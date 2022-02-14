import React, { Fragment } from "react";
import "./home.css"
import banner from "../resources/placeholder.jpg";
import image1 from "../resources/kirby_poster.png";
import image2 from "../resources/snail.jpg";
import image3 from "../resources/yellow_blocks.png";
import image4 from "../resources/kirby small.png"
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