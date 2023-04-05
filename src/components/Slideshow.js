import React, { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import {MapInteractionCSS} from 'react-map-interaction'
import { Paper } from "@mui/material";

const Slideshow = ({ imgs, rotate }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div>
      <div>
        <div className = "image-container">
            <img className = {rotate == 1? "img1": rotate == 2? "img2":rotate == 3? "img3":"img4"} src={imgs[index]} alt="image" />
        </div>
        <div className="actions">
          <button onClick={prev}>
            <GoArrowLeft />
          </button>
          <button onClick={next}>
            <GoArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
