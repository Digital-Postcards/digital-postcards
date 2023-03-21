import { useState } from "react";
import "../styles/explore.css";
import ExplorePostcardEntry from "../components/ExplorePostcardEntry";
import PopUp from "../components/popup";

export default function Explore(props) {
  const [selectedTag, setSelectedTag] = useState();

  // update state of selected tag
  const handleClick = (e) => {
    setSelectedTag(e.target.value);
  };

  var tagArr = [];
  if (props.postcardData) {
    props.postcardData.forEach((postcard) => {
      console.log(postcard);
      for (let j = 0; j < postcard.data.tagData.length; j++) {
        if(postcard.data.tagData[j]){
          if (!tagArr.includes(postcard.data.tagData[j].toLowerCase())) {
            tagArr.push(postcard.data.tagData[j].toLowerCase());
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
    // used to be props.tags where tagArr is below
    return (
      <div id="explore-page-container">
        {/* display tags on left side */}
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
        {/* display postcards on right side */}
        <div id="card-container">
          {props.postcardData ? (
            props.postcardData
              .filter((card) => {
                if (selectedTag === undefined) return true;
                return card.data.tagData.some((tag) => selectedTag === tag);
              })
              .map((card) => {
                if (card === null) return <></>;
                return <ExplorePostcardEntry id={card.id} card={card} />;
              })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

