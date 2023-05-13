import { useState} from "react";
import PostcardEntry from "../components/postcardEntry";
import TradecardEntry from "../components/tradecardEntry";
import PopUp from "../components/popup"
import "../styles/explore.css";;

export default function Explore(props) {
  const [selectedTag, setSelectedTag] = useState(0); // avoid rendering too much data on initial render to improve performance
  const handleClick = (e) => {
    setSelectedTag(e.target.value);
  };

  var tagArr = [];
  if (props.postcardData) {
    props.postcardData.forEach((postcard) => {
      console.log(postcard);
      for (let j = 0; j < postcard.data.tagData.length; j++) {
        if (postcard.data.tagData[j]) {
          if (!tagArr.includes(postcard.data.tagData[j].toLowerCase())) {
            tagArr.push(postcard.data.tagData[j].toLowerCase());
          }
        }
      }
    });
  }
  tagArr.sort();

  if (props.tradecardData) {
    props.tradecardData.forEach((tradecard) => {
      console.log(tradecard);
      for (let j = 0; j < tradecard.data.tagData.length; j++) {
        if (tradecard.data.tagData[j]) {
          if (!tagArr.includes(tradecard.data.tagData[j].toLowerCase())) {
            tagArr.push(tradecard.data.tagData[j].toLowerCase());
          }
        }
      }
    });
  }
  tagArr.sort();

  if (props.show) {
    return (
      <div className="home">
        <PopUp setShow={props.setShow} id="popupComponent" />
      </div>
    );
  } else {
    return props.screen.width < 450 && props.screen.height < 950 ? (
      <div id="mobile-explore-page-container">
        <div id="mobile-card-container">
          {selectedTag == 0 ? (
            <>
              <div className="mobile-initial-screen">
                <h2>Select a tag</h2>
              </div>
            </>
          ) : (
            <>
              {props.postcardData ? (
                props.postcardData
                  .filter((card) => {
                    if (selectedTag === undefined) return true;
                    return card.data.tagData.some(
                      (tag) => tag != null && selectedTag === tag.toLowerCase()
                    );
                  })
                  .map((card) => {
                    if (card === null) return <></>;
                    return <PostcardEntry id={card.id} card={card} screen={props.screen}/>;
                  })
              ) : (
                <></>
              )}
              {props.tradecardData ? (
                props.tradecardData
                  .filter((card) => {
                    if (selectedTag == undefined) return true;
                    return card.data.tagData.some(
                      (tag) => tag != null && selectedTag === tag.toLowerCase()
                    );
                  })
                  .map((card) => {
                    if (card === null) return <></>;
                    return <TradecardEntry id={card.id} card={card} screen={props.screen}/>;
                  })
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        <div id="mobile-tag-container">
          {tagArr
            ? tagArr.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "inline-block",
                    margin: " 0 2%",
                    whiteSpace: "nowrap",
                  }}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id={tag}
                    autoComplete="off"
                    onClick={handleClick}
                    value={tag}
                  />
                  <label className="btn mobile-postcard-tag" htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))
            : "Loading Tags"}
        </div>
      </div>
    ) : (
      <div
        id="explore-page-container"
      >
        <div id="tag-container">
          {tagArr
            ? tagArr.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "inline-block",
                    margin: " 0 2%",
                    whiteSpace: "nowrap",
                  }}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id={tag}
                    autoComplete="off"
                    onClick={handleClick}
                    value={tag}
                  />
                  <label className="btn postcard-tag" htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))
            : "Loading Tags"}
        </div>
        <div id="card-container">
          {selectedTag == 0 ? (
            <>
              <div className="initial-screen">
                <h2>Select a tag</h2>
              </div>
            </>
          ) : (
            <>
              {props.postcardData ? (
                props.postcardData
                  .filter((card) => {
                    if (selectedTag === undefined) return true;
                    return card.data.tagData.some(
                      (tag) => tag != null && selectedTag === tag.toLowerCase()
                    );
                  })
                  .map((card) => {
                    if (card === null) return <></>;
                    return <PostcardEntry id={card.id} card={card} screen = {props.screen}/>;
                  })
              ) : (
                <></>
              )}
              {props.tradecardData ? (
                props.tradecardData
                  .filter((card) => {
                    if (selectedTag == undefined) return true;
                    return card.data.tagData.some(
                      (tag) => tag != null && selectedTag === tag.toLowerCase()
                    );
                  })
                  .map((card) => {
                    if (card === null) return <></>;
                    return <TradecardEntry id={card.id} card={card} screen = {props.screen}/>;
                  })
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
