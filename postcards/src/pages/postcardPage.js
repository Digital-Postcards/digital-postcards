import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/postcardPage.css";

export default function Details(props) {
  const cardId = useParams();
  const location = useLocation();

  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getPostcardByNumber", {
        params: {
          num: parseInt(cardId.id),
        },
      })
      .then((res) => {
        setCardData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  if (cardId.type === "postcard") {
    return <PostcardPage databaseEntry={cardData} />;
  } else if (cardId.type === "tradecard") {
    return <TradecardPage databaseEntry={cardData} />;
  } else {
    <h1>PAGE NOT FOUND</h1>;
  }
}

// class Details extends React.Component{
//     render(){
//         return <p>Welcome to Details Page.</p>
//         if(this.props.type === "postcard"){
//             return <PostcardPage databaseEntry={this.props.databaseEntry}/>
//         }
//         else if(this.props.type === "tradecard"){
//             return <TradecardPage databaseEntry={this.props.databaseEntry}/>
//         }
//         else{
//             <h1>PAGE NOT FOUND</h1>
//         }
//     }
// }
class TradecardPage extends React.Component {
  render() {
    return <p>This is the Trade Card Details Page.</p>;
  }
}
//Props: databaseEntry (imageFront, description, title, time, publisher, location, subject, size, tagArray)
class PostcardPage extends React.Component {
  constructor(props){
    super(props);
    this.state={front: true}
    this.flipFunction = this.flipFunction.bind(this);
  }
  flipFunction(){
    this.setState({front: !(this.state.front)});
  }
  render() {
    return (
      <div className="postcardPageMain">
        {this.props.databaseEntry ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <td width="65%" style={{ textAlign: "center" }}>
                    <img
                      className="postcard-img"
                      src={(this.state.front)? this.props.databaseEntry.imageFront:this.props.databaseEntry.imageBack}
                      alt="Postcard Stuff"
                    />
                  </td>
                  <td className="informationpt2">
                    <PostcardInformation
                      databaseEntry={this.props.databaseEntry} flipFunction={this.flipFunction}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h1 className="description">Brief Description:</h1>
            {/* <h3 className="actualDescriptionText">
              {this.props.databaseEntry.description}
            </h3> */}
            <h3 className="actualDescriptionText">
            This postcard depicts a cartoon-esque caricature of a black woman holding a slice of cake on a plate. She is dressed in a blue-white vertical striped dress, slippers, and a white apron. On her head she wears a knotted, red head-dress with black dots. The woman is shapely with an accentuated stomach. The illustration places emphasis on her large eyes and large red lips; her eyes are nearly entirely black, as if void of a human gaze. At the bottom of the postcard, the title “Aunt Dinah” is written. The only subject of the illustration is the servant woman - the background is a blank beige in color and texture.
Analysis: The image depicts a black servant woman, presumably on her way to serve cake to her employer. Her soulless eyes and accentuated red lips are enough to denote her as a black woman, forgetting the color of her skin; her face is very clearly racialized in a style common to the time period and medium. Her body is approximate to any contemporary individual’s conception of the Mammy: desexualized entirely, with an emphasis on her almost masculinized stature and shape. Her attire is indicative of her position as a servant woman, given her apron and plain dress. The headdress she wears is typical of a racialized (almost exoticized) depiction of a black woman; although she has been domesticated as a servant to her presumably white employer, she still maintains some physical characteristics that are expected of a woman who is perceived as foreign, and “other.” She is referred to as “Aunt Dinah” as a way of denoting her position as an 

            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
function PostcardInformation(props) {
  return (
    <div className="information">
      <div style={{ flexDirection: "row" }}>
        <button className="postcardButton" onClick={props.flipFunction}>Flip</button>
        <button className="postcardButton">Compare</button>
      </div>
      {/* <h3>Publisher: {props.databaseEntry.publisher}</h3>
      <h3>Time: {props.databaseEntry.time}</h3>
      <h3>Location: {props.databaseEntry.location}</h3>
      <h3>Subject: {props.databaseEntry.subject}</h3>
      <h3>Size: {props.databaseEntry.size}</h3>
      <h3>Tags: {props.databaseEntry.size}</h3> */}

      <h3>Number: {props.databaseEntry.id}</h3> <h3></h3>
      <h3>Date: Pre-1907</h3>
      <h3>Postmakred: No</h3>
      <h3>Place: U. S. A</h3>
      <h3>Company: Unknown</h3>
      <h3>Information about Company: n/a</h3>
      <h3>Tags: </h3>
      {/* <h2>{"Tags: " + props.databaseEntry.tagArray.reduce((acc,x)=> {return (acc + ", " + x )})}</h2> */}
    </div>
  );
}
//export default Details;
