import React from "react";
import "../styles/home.css"
import CustomPostcardCarousel from "../components/reactCarouselWrapper";
import axios from "axios";
import PopUp from "../components/popup";


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {imageArray:[]};
    }
    render(){
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
                <CustomPostcardCarousel imageList={this.state.imageArray}/>
                <PopUp id="popupComponent"/>
            </div>
            
        )
    }
    componentDidMount(){
        axios.get("http://localhost:8000/randomPostcards?num=7").then((x)=>{this.setState({imageArray: x.data})});
    }
}


export default Home;