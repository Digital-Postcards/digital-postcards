import React from "react";
import "../styles/slideshow.css";

const Slideshow = ({ imgs, rotate, index }) => {
  return (
    <>
      <div className="slideshow-container">
        <div className="tradecard-image-container">
          {imgs[index]?
          <img
            src = {imgs[index]}
            className={
              rotate === 1
                ? "img1"
                : rotate === 2
                ? "img2"
                : rotate === 3
                ? "img3"
                : "img4"
            }
          />:
          <div>loading...</div>}
        </div>
      </div>
    </>
  );
};

export default Slideshow;
