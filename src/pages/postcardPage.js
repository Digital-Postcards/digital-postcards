import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import PopUp from "../components/popup";
import "../styles/postcardPage.css";

export default function Details(props) {
  //The reason for doing this is if we have gaps in the image id numbers in the files, we have no way of knowing so just iterative search
  const cardParams = useParams();
  const cardId = parseInt(cardParams.id);
  const cardData =
    props.postcardData !== null
      ? props.postcardData.find((card) => card.id === cardId)
      : null;

  if (props.show) {
    return <PopUp setShow={props.setShow} id="popupComponent" />;
  } else {
    return <PostcardPage databaseEntry={cardData} />;
  }
}

const PostcardPage = (props) => {
  const [back, setBack] = useState(false);

  const flipFunction = () => {
    setBack((back) => !back);
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
                  {console.log("before render")}
                  <div className="image-container">
                    <ReactCardFlip isFlipped={back}>
                      <img
                        src={props.databaseEntry.data.value.imageFront}
                        alt="Front Page of Postcard"
                        style={{ width: "40%", height: "40%" }}
                      />
                      <img
                        src={props.databaseEntry.data.value.imageBack}
                        alt="Back Page of Postcard"
                        style={{ width: "40%", height: "40%" }}
                      />
                    </ReactCardFlip>
                  </div>
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
function PostcardInformation(props) {
  return (
    <div className="information">
      <div style={{ flexDirection: "row" }}>
        <button className="postcardButton" onClick={props.flipFunction}>
          Flip
        </button>
      </div>

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
    </div>
  );
}
