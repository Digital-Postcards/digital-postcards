import React from "react";
import Carousel from 'react-material-ui-carousel';
import {Paper, Button} from '@mui/material';
import "./carousel.css"
function PostcardCarousel(props){
    var postcardItems = props.imageList;
    return (
        <Carousel className="carousel" animation="slide">
            {
                postcardItems.map((item, i) => <Item key={i} item={item} /> ) //i is index of element, item is.. item
                //Scale the images here
            }
        </Carousel>
    )
}
function Item(props){
    return(
        <Paper>
            <img src={props.item} alt="Card not found! Please try again later."></img>
        </Paper>
    )
}
export default PostcardCarousel;