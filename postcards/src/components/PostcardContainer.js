import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import postcard from "../resources/5B.jpg";

export default function PostcardContainer(props) {
  return (
    <div id="postcards-panel">
      <div id="postcards-container">
        {props.selected && props.cardData ? (
          props.cardData.map((card) => {
            return (
              <Card sx={{ maxWidth: 345 }} style={{backgroundColor: "#acd3dc"}}>
                <CardActionArea onClick={() => {alert("Clicked")}}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={postcard}
                    alt="sample postcard"
                  />
                  <CardContent>{card.options.name}</CardContent>
                </CardActionArea>
              </Card>
            );
          })
        ) : (
          <p>Please choose a cluster to display postcards.</p>
        )}
      </div>
    </div>
  );
}
