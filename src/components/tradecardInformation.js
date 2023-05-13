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
    <div
      className={
        props.screen.width < 450 && props.screen.height < 950
          ? "mobile-slideshow-information-container"
          : "slideshow-information-container"
      }
    >
      <div className="slideshow-information">
        <p>Number: {props.databaseEntry.id}</p>
        <p>Date:</p>
        <p>Postmarked: {props.databaseEntry.data.postmarked}</p>
        <p>Place: {props.databaseEntry.data.location}</p>
        <p>Company:</p>
        <p>Information about Company:</p>
        <p>
          Tags:{" "}
          {props.databaseEntry.data.tagData
            .reduce(
              (acc, x, i, arr) =>
                i !== arr.length - 1 ? acc + x + ", " : acc + x,
              " "
            )
            .toUpperCase()}
        </p>
      </div>

      <div className="slideshow-buttons">
        <button
          className={
            props.screen.width < 450 && props.screen.height < 950
              ? "mobile-rotate-button"
              : "rotate-button"
          }
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
