import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostcardContainer(props) {

  return (
    <div id="postcards-panel">
      <div id="postcards-container">
        {props.selected && props.cardData ? (
          props.cardData.map((card) => {
            let className = "panel-" + card.options.type; // display according to the type of card
            return (
              <Link
                key={card.options.id}
                to={{
                  pathname: `/postcardDetails/postcard/${card.options.id}`
                }}
              >
                <div>
                <Card
                  sx={{ maxWidth: "60%" }}
                  className={className}
                  key={card.options.id}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      width="70%"
                      image={card.options.imageFront}
                      alt="postcard" // update alternative text
                    />
                  </CardActionArea>
                </Card>
                </div>
              </Link>
            );
          })
        ) : (
          <p>Please choose a cluster to display postcards.</p>
        )}
      </div>
    </div>
  );
}
