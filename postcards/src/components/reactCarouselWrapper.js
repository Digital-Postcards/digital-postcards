import React from "react";
import "../styles/customCarousel.css"
import { Link} from "react-router-dom";
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
        let firstImage = this.state.imageList[0];
        let newImageList = this.state.imageList.map((x,i,arr)=> {
            return (i === (arr.length -1))? firstImage:arr[i+1];
        });
        this.setState({imageList: newImageList})
    }
    render() { 
        return (
            <div className="carousel">
                {this.state.imageList.map((x)=><CustomPostcardItem key={x.id} classname="imageCarouselItems" image={x}/>)} 
            </div>
        );
    }
    componentDidMount(){
        this.reOrderArray = setInterval(()=>this.modifyImageArrayState(),5000);
    }
    componentWillUnmount(){
        clearInterval(this.reOrderArray);
    }
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
            <img className="carousel-Item" src={props.image.imageFront} alt="Card not found! Please try again later."></img>
        </Link>
    )
}
export default CustomPostcardCarousel;