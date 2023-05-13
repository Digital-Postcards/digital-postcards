import React from "react";
//css in tradecardPage.css

const Slideshow = ({ imgs, rotate, index, screen }) => {
  return (
    <>
      <div
        className={
          screen.width < 450 && screen.height < 950
            ? "mobile-slideshow-container"
            : "slideshow-container"
        }
      >
        <div
          className={
            screen.width < 450 && screen.height < 950
              ? "mobile-tradecard-image-container"
              : "tradecard-image-container"
          }
        >
          {imgs[index] ? (
            <img
              src={imgs[index]}
              className={
                rotate === 1
                  ? "img1"
                  : rotate === 2
                  ? "img2"
                  : rotate === 3
                  ? "img3"
                  : "img4"
              }
            />
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Slideshow;
