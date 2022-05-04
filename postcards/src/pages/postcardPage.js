import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/postcardPage.css";
import ReactCardFlip from "react-card-flip";

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
const PostcardPage = (props) => {
  const [censored, setCensored] = useState(null);
  const [back, setBack] = useState(false);
  const imageFront = useRef(null);

  const flipFunction = () => {
    setBack(!back);
  };

  useEffect(() => {
    if (props.databaseEntry) {
      if (back) {
        setCensored(null);
      }
      if (!back && props.databaseEntry.censor) {
        setCensored(true);
      }
    }
  }, [props.databaseEntry, back]);

  // useLayoutEffect(() => {
  //   if (props.databaseEntry) {
  //     let frontImage = document.getElementsByClassName("postcard-img")[0];
  //     let computedStyle = window.getComputedStyle(frontImage);
  //     setImageWidth(computedStyle.getPropertyValue("width"));
  //     setImageHeight(
  //       computedStyle.getPropertyValue("height").replace("px", "") - 30 + "px"
  //     );
  //   }
  // }, [censored]);

  // useLayoutEffect(() => {
  //   if (imageFront.current && censored) {
  //     setImageWidth(imageFront.current.clientWidth + "px");
  //     setImageHeight(imageFront.current.clientHeight.toString().replace("px", "") - 30 + "px");
  //     console.log(imageFront.current);
  //   }
  // })

  const handleUncensor = () => {
    setCensored(false);
  };

  const handleCensor = () => {
    setCensored(true);
  };

  const renderCensorCtrl = () => {
    if (censored == null) {
      return null;
    }

    let imageWidth = imageFront.current.clientWidth + "px";
    let imageHeight =
      imageFront.current.clientHeight.toString().replace("px", "") -
      30 +
      "px";
      
    if (censored) {
      return (
        <div className="censor-container-outer">
          <div
            className="censor-container-inner"
            style={{ width: `${imageWidth}` }}
          >
            <div>
              <p>This image may contain nudity.</p>
              <button id="" onClick={handleUncensor}>
                See Image
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="censor-container-outer">
        <div
          className="censor-container-inner"
          style={{
            width: `${imageWidth}`,
            top: `${imageHeight}`,
            height: 30,
          }}
        >
          <button id="hide-img-btn" onClick={handleCensor}>
            Hide Image
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="postcardPageMain">
      {props.databaseEntry ? (
        <div>
          <table>
            <tbody>
              <tr>
                <td
                  width="65%"
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <ReactCardFlip isFlipped={back}>
                    <img
                      ref={imageFront}
                      className={
                        "postcard-img" + (censored ? " censored-img" : "")
                      }
                      src={props.databaseEntry.imageFront}
                      alt="Front Page of Postcard"
                    />
                    <img
                      className={
                        "postcard-img" + (censored ? " censored-img" : "")
                      }
                      src={props.databaseEntry.imageBack}
                      alt="Back Page of Postcard"
                    />
                  </ReactCardFlip>
                  {renderCensorCtrl()}
                </td>
                <td className="informationpt2">
                  <PostcardInformation
                    databaseEntry={props.databaseEntry}
                    flipFunction={flipFunction}
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
            This is a brief description of the postcard.
          </h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
function PostcardInformation(props) {
  return (
    <div className="information">
      <div style={{ flexDirection: "row" }}>
        <button className="postcardButton" onClick={props.flipFunction}>
          Flip
        </button>
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
