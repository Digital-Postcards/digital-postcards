import React from "react";
import "../styles/customCarousel.css"
import { Link} from "react-router-dom";
/*
* props property: imageList: takes in an image and maps them to the image item
*/
function CustomPostcardCarousel(props){ 
    return (
        <div className="carousel">
            {props.imageList.map((x,i)=><CustomPostcardItem 
            key={x.id} index={i} classname="imageCarouselItems" image={x}/>)} 
        </div>
    );
}
function CustomPostcardItem(props){
    return(
        <Link key={props.image._id}
        to={{
          pathname: `/postcardDetails/postcard/${props.image.id}`,
          custom: "Hi World",
          state: {
            message: "Hello World",
          },
        }}>
            <img className="carousel-Item" id={"picture" + props.index + ""} src={props.image.imageFront} alt="Card not found! Please try again later."></img>
        </Link>
    )
}
export default CustomPostcardCarousel;