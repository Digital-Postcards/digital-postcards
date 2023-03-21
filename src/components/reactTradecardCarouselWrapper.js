import React from "react";
import "../styles/customCarousel.css"
import { Link} from "react-router-dom";
/*
* props property: imageList: takes in an image and maps them to the image item
*/
function CustomTradecardCarousel(props){ 
    if(props.horizontal) {
        return (
            <div className="horizontalCarousel">
                {(props.imageList !== undefined)? props.imageList.map((x,i)=><CustomTradecardItem 
                key={x.id} index={i} classname="imageCarouselItems" image={x}/>):<></>} 
            </div>
        );
    } else {
        return (
            <div className="carousel">
                {(props.imageList !== undefined)? props.imageList.map((x,i)=><CustomTradecardItem 
                key={x.id} index={i} classname="imageCarouselItems" image={x}/>):<></>} 
            </div>
        );
    }
}
function CustomTradecardItem(props){
    return(
        <Link id={"picture" + props.index + ""} className="carousel-Item"  key={props.image._id}
        to={{
          pathname: `/tradecardDetails/tradecard/${props.image.id}`,
          custom: "Hi World",
          state: {
            message: "Hello World",
          },
        }}>
            <img src={props.image.data.value[0]} alt="Card not found! Please try again later."></img>
        </Link>
    )
}
export default CustomTradecardCarousel;