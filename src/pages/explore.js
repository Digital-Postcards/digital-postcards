import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/explore.css";

export default function Explore(props) {
  const axios = require("axios");

  const [tags, setTags] = useState(null);
  const [selectedTag, setSelectedTag] = useState();

  // retrieve tags from server
  useEffect(() => {
    axios
      .get("http://localhost:8000/getTags")
      .then((res) => {
        setTags(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  // update state of selected tag
  const handleClick = (e) => {
    setSelectedTag(e.target.value);
  };

  //  test if selected tag is working
  useEffect(() => {
    console.log(selectedTag);
  }, [selectedTag]);

  return (
    <div id="explore-page-container">

      {/* display tags on left side */}
      <div id="tag-container">
        {tags
          ? tags.map((tag) => (
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
          }).map((card) => {
            return (
              <div className="index-container" key={card.id}>
                <Link
                  key={card.id}
                  to={{
                    pathname: `/postcardDetails/postcard/${card.id}`,
                  }}
                >
                  <div className="index-card-container">
                    <Card
                      sx={{ maxWidth: "80%" }}
                      style={{ backgroundColor: "#f7ce7e", minWidth: "100%" }}
                      key={card.id}
                    >
                      <CardActionArea>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <CardMedia
                                  component="img"
                                  className="postcard-index-img"
                                  style={{ float: "left" }}
                                  image={card.data.value.imageFront} //display front image
                                  alt="postcard image" // update alternative text
                                />
                              </td>
                              <td>
                                <CardContent className="card-summary">
                                  {/* dummy data that needs to be updated with card.data */}
                                  <p style={{margin:2}}>Name:</p>
                                  <p style={{margin:2}}>Year:</p>
                                  <p style={{margin:2}}>Id: {card.id}</p>
                                  <p style={{margin:2}}>Location：{card.data.location} </p>
                                  <p style={{margin:2}}>Description: {(card.data.description.length > 200)? card.data.description.substring(0,100)+"...":card.data.description}</p>
                                </CardContent>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </CardActionArea>
                    </Card>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
