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
                                image={card.data.value.imageFront} //display front image
                                alt="postcard" // update alternative text
                              />
                            </td>
                            <td>
                              <CardContent className="card-summary">
                                {/* dummy data that needs to be updated with card.data */}
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
