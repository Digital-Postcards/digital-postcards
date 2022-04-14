import axios from "axios";
import React from "react";
import PopUp from "../components/popup";
import CustomPostcardCarousel from "../components/reactCarouselWrapper.js"
class Narration extends React.Component{
    constructor(props){
        super(props);
        this.state = {imageArray:[]};
    }
    render(){
        return (
        <div>
            <div>
                <PopUp/>
            </div>
            <div>
            {(this.state.imageArray.length === 0)? <></>:<CustomPostcardCarousel imageList={this.state.imageArray}/>}
            </div>
        </div>)
    }
    componentDidMount(){
        axios.get("http://localhost:8000/randomPostcards?num=10").then((x)=>{this.setState({imageArray: x.data})});
    }
}
export default Narration;