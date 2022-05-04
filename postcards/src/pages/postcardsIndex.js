import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function PostcardsIndex(props) {
  return (
    <div>
      {props.postcardData ? (
        props.postcardData.map((card) => {
          return (
            <div className="index-container" key={card.id}>
              <Link
                key={card.id}
                to={{
                  pathname: `/postcardDetails/postcard/${card.id}`,
                  custom: "Hi World",
                  state: {
                    message: "Hello World",
                  },
                }}
              >
                <div className="index-card-container">
                  <Card
                    sx={{ maxWidth: "80%" }}
                    style={{ backgroundColor: "#f7ce7e", minWidth: "100%"}}
                    key={card.id}
                  >
                    <CardActionArea>
                      <table>
                        <tbody>
                        <tr style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <td>
                            <CardMedia
                              component="img"
                              className="postcard-index-img"
                              style={{ float: "left" }}
                              image={card.imageFront}
                              alt="sample postcard"
                            />
                          </td>
                          <td style={{position: "absolute", left: "20%"}}>
                            <CardContent className="card-summary">
                              <p>Name</p>
                              <p>Year</p>
                              <p>Location</p>
                              <p>
                                This is a brief description of the postcard.
                              </p>
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
  );
}
