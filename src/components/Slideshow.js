import React from "react";
import "../styles/slideshow.css";

const Slideshow = ({ imgs, rotate, index }) => {
  const images = imgs.map((img) => (
    <img
      className={
        rotate === 1
          ? "img1"
          : rotate === 2
          ? "img2"
          : rotate === 3
          ? "img3"
          : "img4"
      }
      src={img}
    />
  )); //pre-render images

  
  return (
    <>
      <div className="slideshow-container">
        <div className="image-container">
          {images.filter((img, i) => i === index)}
        </div>
      </div>
    </>
  );
};

export default Slideshow;
