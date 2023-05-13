import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import PopUp from "../components/popup";
import PostcardInformation from "../components/postcardInformation";
import "../styles/postcardPage.css";

const PostcardPage = (props) => {
  const [back, setBack] = useState(false);
  const cardParams = useParams();
  const cardId = parseInt(cardParams.id);
  const cardData =
    props.postcardData !== null
      ? props.postcardData.find((card) => card.id === cardId)
      : null;

  const flipFunction = () => {
    setBack((back) => !back);
  };

  if (props.show) {
    return <PopUp setShow={props.setShow} id="popupComponent" />;
  } else {
    return (
      <div>
        {cardData ? (
          <div className="postcards-main-panel">
            <div className={(props.screen.width < 450 && props.screen.height < 950)? "mobile-postcards-upper-panel" : "postcards-upper-panel"}>
              <div className={(props.screen.width < 450 && props.screen.height < 950)? "mobile-postcard-image-container" : "postcard-image-container"}>
                <ReactCardFlip isFlipped={back}>
                  <img
                    src={cardData.data.value.imageFront}
                    alt="Front Page of Postcard"
                  />
                  <img
                    src={cardData.data.value.imageBack}
                    alt="Back Page of Postcard"
                  />
                </ReactCardFlip>
              </div>
              <PostcardInformation
                databaseEntry={cardData}
                flipFunction={flipFunction}
                screen = {props.screen}
              />
            </div>
            <div className="postcards-lower-panel">
              <div className="postcard-description">
                <h3> Brief Description:</h3>
                <p>
                  {cardData.data.description.length === 0
                    ? "N/A"
                    : cardData.data.description}
                </p>
              </div>
              <div className="postcard-analysis">
                <h3>Analysis:</h3>
                <p>
                  {cardData.data.analysis.length === 0
                    ? "N/A"
                    : cardData.data.analysis}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default PostcardPage;
