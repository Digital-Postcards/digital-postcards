import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import postcard from "../resources/5B.jpg";
import { Link, useLocation } from "react-router-dom";

export default function PostcardContainer(props) {

  const [selectedCard, setSelectedCard]  = useState(null);

  const location = useLocation();

  const handleClick = (card) => {
    // console.log(card);
    setSelectedCard(card);
  }

  return (
    <div id="postcards-panel">
      <div id="postcards-container">
        {props.selected && props.cardData ? (
          props.cardData.map((card) => {
            return (
              <Link
                to={{
                  pathname: `/postcardDetails/${card.options.name}`,
                  custom: "Hi World",
                  state: {
                    message: "Hello World",
                  }
                }}
              >
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ backgroundColor: "#acd3dc" }}
                  key={card.options.name}
                  onClick={() => handleClick(card.options.name)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={postcard}
                      alt="sample postcard"
                    />
                    <CardContent>{card.options.name}</CardContent>
                  </CardActionArea>
                </Card>
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
