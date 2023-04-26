import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

export default function CardContainer(props) {
  useEffect(() => {
    console.log(props)
    }, [props]);

  return (
    <div id="postcards-panel">
      <div id="postcards-container">
        {props.selected && props.cardData ? (
          props.cardData.map((card) => {
            //let className = "panel-" + card.options.type; // display according to the type of card
            return(
              <>
            {card.id<500 && card.id>0?(
              <Link
                key={card.id}
                to={{
                  pathname: `/postcardDetails/postcard/${card.id}`
                }}
              >
                <Card
                  sx={{ maxWidth: "60%" }}
                  key={card.id}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      width="70%"
                      image={card.data.value.imageFront}
                      alt="postcard" // update alternative text
                    />
                  </CardActionArea>
                </Card>
              </Link>
            ):(
              <Link
                key={card.id}
                to={{
                  pathname: `/tradecardDetails/tradecard/${card.id}`
                }}
              >
                <Card
                  sx={{ maxWidth: "60%" }}
                  key={card.id}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      width="70%"
                      image={card.data.value[0]}
                      alt="tradecard" // update alternative text
                    />
                  </CardActionArea>
                </Card>
              </Link>
            )
            }
            </>
            )
          })
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
