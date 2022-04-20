import React from "react";
import "../styles/home.css"
import CustomPostcardCarousel from "../components/reactCarouselWrapper";
import axios from "axios";
import PopUp from "../components/popup";
import TradeCardTree from "../components/TradecardTree";
import TradeCardViewer from "../components/tradecardViewer";


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {imageArray:[]};
    }
    render(){
        return (
            <div className="home"> 
            <PopUp/>
            {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
                {/**************************** Banner **************************************/}
                {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
                <div className="bannerCrop">
                    {/* <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img> */}
                </div> 
                {/* <TradeCardViewer/> */}
                {/**************************** Carousel **************************************/}
                <CustomPostcardCarousel imageList={this.state.imageArray}/>

            </div>
    
        )
    }
    componentDidMount(){
        axios.get("http://localhost:8000/randomPostcards?num=8").then((x)=>{this.setState({imageArray: x.data})});
    }
}


export default Home;