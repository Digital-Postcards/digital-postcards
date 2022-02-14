import React from "react";
import Carousel from 'react-material-ui-carousel';
import {Paper, Button} from '@mui/material';
import "./carousel.css"
function PostcardCarousel(props){
    var postcardItems = props.imageList;
    return (
        <Carousel animation="slide" height="fit-content" >
            {
                postcardItems.map((item, i) => <Item key={i} item={item} /> ) //i is index of element, item is.. item
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