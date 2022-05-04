import { useEffect, useState } from "react";
import "../styles/postcardIndex.css";


export default function Explore(props) {

  const axios = require("axios");

  const [tags, setTags] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/getTags')
      .then((res) => {
        setTags(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  const handleClick = (e) => {
    setSelectedTags((prev) => [...prev, e.target.value]);
    // console.log(e.target.checked);
  };

  const dummyTags = ["Mammy", "Ayah", "French", "Indian Man Servants", "Other Servants"];

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // console.log(selectedTags);
  }, [selectedTags]);

  return (
    <div id="explore-page-container">
    <div id="tag-container">
      {tags ? tags.map((tag) => (
        <div key={tag} style={{display: "inline-block", margin: " 0.5% 2%", whiteSpace: "nowrap"}}>
        <input
        type="radio"
        className="btn-check "
        name="options-outlined"
        id={tag}
        autoComplete="off"
        onClick={handleClick}
        value={tag}
      />
      <label
        className="btn btn-outline-success postcard-subj"
        htmlFor={tag}
      >
        {tag}
      </label>
        </div>
      )): "Tags cannot be loaded."}
    </div>
    <div id="card-container"></div>
    </div>
  );
}
