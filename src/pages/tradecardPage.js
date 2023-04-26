import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PopUp from "../components/popup";
import Slideshow from "../components/slideshow.js";
import TradecardInformation from "../components/tradecardInformation.js";
import "../styles/tradecardPage.css";

const TradecardPage = (props) => {
  const cardParams = useParams();
  const cardId = parseInt(cardParams.id);
  const cardData =
    props.tradecardData !== null
      ? props.tradecardData.find((card) => card.id === cardId)
      : null;

  const [rotate, setRotate] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  if (props.show) {
    return (
      <div className="home">
        <PopUp setShow={props.setShow} id="popupComponent" />
      </div>
    );
  } else {
    return (
      <div>
        {cardData ? (
          <div className="tradecards-main-panel">
            <div className="tradecards-upper-panel">
              <Slideshow
                imgs={cardData.data.value}
                rotate={rotate}
                index={index}
              ></Slideshow>
              <TradecardInformation
                databaseEntry={cardData}
                rotate={rotate}
                setRotate={setRotate}
                index={index}
                setIndex={setIndex}
              />
            </div>

            <div className="tradecards-lower-panel">
              <h1 className="tradecard-description">Brief Description:</h1>
              <h3>
                {cardData.data.description.length === 0
                  ? "N/A"
                  : cardData.data.description}
              </h3>
              <h1 className="tradecard-analysis">Analysis:</h1>
              <h3>
                {cardData.data.analysis.length === 0
                  ? "N/A"
                  : cardData.data.analysis}
              </h3>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default TradecardPage;
