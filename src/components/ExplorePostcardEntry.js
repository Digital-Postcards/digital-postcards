import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function ExplorePostcardEntry(props){
    let descriptionLimit = 190;
    return (
    <div className="index-container" key={props.card.id}>
      <Link
        key={props.card.id}
        to={{pathname: `/postcardDetails/postcard/${props.card.id}`,}}>
        <div className="index-card-container">
          <Card
            sx={{ maxWidth: "80%" }}
            style={{ backgroundColor: "#f7ce7e", minWidth: "100%" }}
            key={props.card.id}
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
                        image={props.card.data.value.imageFront} //display front image
                        alt="postcard image" // update alternative text
                      />
                    </td>
                    <td>
                    <CardContent className="card-summary"> 
                        {/* dummy data that needs to be updated with card.data */}
                        <p style={{margin:2}}>Name:</p>
                        <p style={{margin:2}}>Year:</p>
                        <p style={{margin:2}}>Location：{props.card.data.location} </p>
                        <p style={{margin:2}}>Description: {(props.card.data.description.length > descriptionLimit)? props.card.data.description.substring(0,descriptionLimit)+"...":props.card.data.description}</p>
                      </CardContent> 
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardActionArea> 
          </Card>
        </div>
      </Link> 
    </div>)
  }