import React from "react";
import "../styles/home.css"
import CustomPostcardCarousel from "../components/reactCarouselWrapper";
import PopUp from "../components/popup";

export default function Home(props){
    let chosenPostcards = [], chosenNumbers = new Set(), randomNumber = 0;
    if(props.postcardData !== null){
        while(chosenNumbers.size !== 7){
            randomNumber = Math.floor(Math.random() * props.postcardData.length)
            if(!chosenNumbers.has(randomNumber)){
                chosenPostcards.push(props.postcardData[randomNumber]);
                chosenNumbers.add(randomNumber);
            }
            //If already in, then redo the number
        }
    }
    else{
        chosenPostcards = undefined;
    }
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
            <PopUp id="popupComponent"/>
        </div>
        
    )
}