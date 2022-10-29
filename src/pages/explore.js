import { useState } from "react";
import "../styles/explore.css";
import ExplorePostcardEntry from "../components/ExplorePostcardEntry";

export default function Explore(props) {
  const [selectedTag, setSelectedTag] = useState();

  // update state of selected tag
  const handleClick = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <div id="explore-page-container">
      {/* display tags on left side */}
      <div id="tag-container">
        {props.tags
          ? props.tags.map((tag) => (
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
          props.postcardData.filter((card)=>{
            if(selectedTag === undefined)
              return true;
            return card.data.tagData.some((tag)=>selectedTag===tag);
          }).map((card)=>{
            if(card === null)
              return <></>
            return <ExplorePostcardEntry id={card.id} card={card}/>})):<></>}
      </div>
    </div>
  );
}


