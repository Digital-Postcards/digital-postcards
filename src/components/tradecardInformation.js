import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

function TradecardInformation(props) {
  const rotateImage = () => {
    if (props.rotate === 4) {
      props.setRotate(0);
    } else {
      props.setRotate(props.rotate + 1);
    }
  };
  
  const nextTradecardImage = () => {
    if (props.index === props.databaseEntry.data.value.length - 1) {
      props.setIndex(0);
    } else {
      props.setIndex(props.index + 1);
    }
  };
  
  const prevTradecardImage = () => {
    if (props.index === 0) {
      props.setIndex(props.databaseEntry.data.value.length - 1);
    } else {
      props.setIndex(props.index - 1);
    }
  };
  
  return (
    <div>
      <div className="slideshow-information">
        <h3>Number: {props.databaseEntry.id}</h3>
        <h3>Date:</h3>
        <h3>Postmarked: {props.databaseEntry.data.postmarked}</h3>
        <h3>Place: {props.databaseEntry.data.location}</h3>
        <h3>Company:</h3>
        <h3>Information about Company:</h3>
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

      <div className="slideshow-buttons">
        <button
          className="rotate-button"
          onClick={() => {
            rotateImage();
          }}
        >
          Rotate
        </button>

        <div className="arrow-button-group">
          <button className="arrow-button" onClick={prevTradecardImage}>
            <GoArrowLeft />
          </button>
          <button className="arrow-button" onClick={nextTradecardImage}>
            <GoArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradecardInformation;