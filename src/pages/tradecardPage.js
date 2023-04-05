import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/tradecardPage.css";
import PostcardPage from "./postcardPage.js";
import Slideshow from "../components/Slideshow.js";
import "../styles/slideshow.css";
import PopUp from "../components/popup";

export default function Details(props) {
  //The reason for doing this is if we have gaps in the image id numbers in the files, we have no way of knowing so just iterative search
  const cardParams = useParams();
  const cardId = parseInt(cardParams.id);
  const cardData =
    props.tradecardData !== null
      ? props.tradecardData.find((card) => card.id === cardId)
      : null;

  if (props.show) {
    return (
      <div className="home">
        <PopUp setShow={props.setShow} id="popupComponent" />
      </div>
    );
  } else {
    if (cardParams.type === "postcard") {
      return <PostcardPage databaseEntry={cardData} />;
    } else if (cardParams.type === "tradecard") {
      return <TradecardPage databaseEntry={cardData} />;
    } else {
      <h1>PAGE NOT FOUND</h1>;
    }
  }
}

//Props: databaseEntry (imageFront, description, title, time, publisher, location, subject, size, tagArray)
const TradecardPage = (props) => {
  // const [censored, setCensored] = useState(null);
  const [back, setBack] = useState(false);
  const [rotate, setRotate] = useState(1);
  // const imageFront = useRef(null);

  // useEffect(() => {
  //   if (props.databaseEntry) {
  //     if (back) {
  //       setCensored(null);
  //     }
  //     if (!back && props.databaseEntry.censor) {
  //       setCensored(true);
  //     }
  //   }
  // }, [props.databaseEntry, back]);

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

  // const handleUncensor = () => {
  //   setCensored(false);
  // };

  // const handleCensor = () => {
  //   setCensored(true);
  // };

  // const renderCensorCtrl = () => {
  //   if (censored == null) {
  //     return null;
  //   }
  //   if (censored) {
  //     return (
  //       <div className="censor-container-outer">
  //         <div
  //           className="censor-container-inner"
  //           style={{ width: `${imageWidth}` }}
  //         >
  //           <div>
  //             <p>This image may contain nudity.</p>
  //             <button id="" onClick={handleUncensor}>
  //               See Image
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // return (
  //   <div className="censor-container-outer">
  //     <div
  //       className="censor-container-inner"
  //       style={{
  //         width: `${imageWidth}`,
  //         top: `${imageHeight}`,
  //         height: 30,
  //       }}
  //     >
  //       <button id="hide-img-btn" onClick={handleCensor}>
  //         Hide Image
  //       </button>
  //     </div>
  //   </div>
  // );
  // };

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
                  {console.log("before render")}
                  <Slideshow
                    imgs={props.databaseEntry.data.value}
                    rotate={rotate}
                  >
                    {" "}
                  </Slideshow>
                  {/*className={
                        "postcard-img" + (censored ? " censored-img" : "")
                      }*/}
                  {/* {renderCensorCtrl()} */}
                </td>
                <td className="informationpt2">
                  <TradecardInformation
                    databaseEntry={props.databaseEntry}
                    rotate={rotate}
                    setRotate={setRotate}
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
            {props.databaseEntry.data.description.length === 0
              ? "N/A"
              : props.databaseEntry.data.description}
          </h3>
          <h1 className="description">Analysis:</h1>
          <h3 className="actualDescriptionText">
            {props.databaseEntry.data.analysis.length === 0
              ? "N/A"
              : props.databaseEntry.data.analysis}
          </h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

function TradecardInformation(props) {
  function rotateImage() {
    if (props.rotate == 4) {
      props.setRotate(0);
    } else {
      props.setRotate(props.rotate + 1);
    }
  }

  return (
    <div className="information">
      <div style={{ flexDirection: "row" }}>
        <button
          className="postcardButton"
          onClick={() => {
            rotateImage();
          }}
        >
          Rotate
        </button>
      </div>
      {/* <h3>Publisher: {props.databaseEntry.publisher}</h3>
      <h3>Time: {props.databaseEntry.time}</h3>
      <h3>Location: {props.databaseEntry.location}</h3>
      <h3>Subject: {props.databaseEntry.subject}</h3>
      <h3>Size: {props.databaseEntry.size}</h3> */}

      <h3>Number: {props.databaseEntry.id}</h3>
      <h3>Date: </h3>
      <h3>Postmarked: {props.databaseEntry.data.postmarked}</h3>
      <h3>Place: {props.databaseEntry.data.location}</h3>
      <h3>Company: Unknown</h3>
      <h3>Information about Company: n/a</h3>
      <h3>
        Tags:{" "}
        {props.databaseEntry.data.tagData
          .reduce(
            (acc, x, i, arr) =>
              i !== arr.length - 1 ? acc + x + ", " : acc + x,
            " "
          )
          .toUpperCase()}
      </h3>
      {/* <h2>{"Tags: " + props.databaseEntry.tagArray.reduce((acc,x)=> {return (acc + ", " + x )})}</h2> */}
    </div>
  );
}
//export default Details;
