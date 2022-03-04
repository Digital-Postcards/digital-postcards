import React from "react";
import "./customCarousel.css"
import {Paper} from '@mui/material';
/*
* props property: imageList: takes in an image and maps them to the image item
*/
class CustomPostcardCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state = {imageList: this.props.imageList}
        this.modifyImageArrayState = this.modifyImageArrayState.bind(this);
    }
    //Moves the array image stuff one over
    modifyImageArrayState(){
        let newImageList = this.state.imageList.map((x)=> x); //Copy the array over
        newImageList.push(newImageList.pop());
        this.setState({imageList: newImageList})
    }
    render() {
        return (
            <div className="carousel">
                {this.state.imageList.map((x)=><CustomPostcardItem classname="imageCarouselItems" image={x}/>)}
            </div>
        );
    }
    
}
function CustomPostcardItem(props){
    return(
        <img className="carousel-Item" src={props.image} alt="Card not found! Please try again later."></img>
    )
}
export default CustomPostcardCarousel;


