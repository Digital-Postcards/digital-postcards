import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/postcardPage.css";
import ReactCardFlip from 'react-card-flip';

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
                    <ReactCardFlip isFlipped={this.state.front}>
                      <img src={this.props.databaseEntry.imageFront}/>
                      <img src={this.props.databaseEntry.imageBack}/>
                    </ReactCardFlip>
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
            <h3 className="actualDescriptionText">DESCRIPTION</h3>
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
