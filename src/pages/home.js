import React, {useState} from "react";
import "../styles/home.css"
import CustomPostcardCarousel from "../components/reactCarouselWrapper";
import PopUp from "../components/popup";

export default function Home(props){
    let chosenPostcards = [];
    if(props.postcardData !== null){
        for(let i = 0; i < 7; i++){
            chosenPostcards.push(props.postcardData[i]);
            //If already in, then redo the number
        }
    }
    else{
        chosenPostcards = undefined;
    }
    if(props.show) {
        return (
            <div className="home"> 
            {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
                {/**************************** Banner **************************************/}
                {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
                <div className="bannerCrop">
                    {/* <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img> */}
                    <h1 id="bannerText">Race, Gender, and the Visual Culture of Domestic Labor: <br/> Tradecards and Postcards, 1870s to 1940s </h1>
                </div> 
                {/**************************** Carousel **************************************/}
                <CustomPostcardCarousel imageList={chosenPostcards}/>
                <PopUp setShow={props.setShow} id="popupComponent"/>
            </div>
            
        );
    } else {
        return (
            <div className="home"> 
            {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
                {/**************************** Banner **************************************/}
                {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
                <div className="bannerCrop">
                    {/* <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img> */}
                    <h1 id="bannerText">Race, Gender, and the Visual Culture of Domestic Labor: <br/> Tradecards and Postcards, 1870s to 1940s </h1>
                </div> 
                {/**************************** Carousel **************************************/}
                <CustomPostcardCarousel imageList={chosenPostcards}/>
            </div>
            
        );
    }
}