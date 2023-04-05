import React from "react";
import "../styles/customCarousel.css"
import { Link} from "react-router-dom";
/*
* props property: imageList: takes in an image and maps them to the image item
*/
function CustomPostcardCarousel(props){ 
    let numPics = props.imageList.length;
    numPics*=20;
    numPics-=20;
    const keyframes = `@-webkit-keyframes moving-carousel {
        0% { left: -20vw; }
        100% { left: ${numPics}vw; }
      }`;
    document.styleSheets[0].insertRule(keyframes, document.styleSheets[0].cssRules.length);
    if(props.horizontal) {
        return (
            <div className="horizontalCarousel">
                {(props.imageList !== undefined)? props.imageList.map((x,i)=><CustomPostcardItem 
                key={x.id} index={i} classname="imageCarouselItems" image={x} length={props.imageList.length}/>):<></>} 
            </div>
        );
    } else {
        return (
            <div className="carousel">
                {(props.imageList !== undefined)? props.imageList.map((x,i)=><CustomPostcardItem 
                key={x.id} index={i} classname="imageCarouselItems" image={x} length={props.imageList.length}/>):<></>} 
            </div>
        );
    }
}
function CustomPostcardItem(props){
    return(
        <Link className="carousel-Item"  key={props.image._id}
        to={{
          pathname: `/postcardDetails/postcard/${props.image.id}`,
          custom: "Hi World",
          state: {
            message: "Hello World",
          },
        }}
        style ={{"animation-delay":(props.index*-2) + "s", "animation-duration":(props.length*2) + "s"}}
        >
            <img src={props.image.data.value.imageFront} className={"scale"} alt="Card not found! Please try again later."></img>
        </Link>
    )
}
export default CustomPostcardCarousel;