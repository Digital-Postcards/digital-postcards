import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/postcardPage.css";

export default function Details(props) {
  const cardId = useParams();
  const location = useLocation();

  const [cardData, setCardData] = useState(null);

  let type = "postcard";

  useEffect(() => {
    axios
      .get("http://localhost:8000/getPostcardByNumber", {
        params: {
          num: 1,
        },
      })
      .then((res) => {
        setCardData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  if (type === "postcard") {
    return <PostcardPage databaseEntry={cardData} />;
  } else if (type === "tradecard") {
    return <TradecardPage databaseEntry={cardData} />;
  } else {
    <h1>PAGE NOT FOUND</h1>;
  }
}

// class Details extends React.Component{
//     render(){
//         return <p>Welcome to Details Page.</p>
//         if(this.props.type === "postcard"){
//             return <PostcardPage databaseEntry={this.props.databaseEntry}/>
//         }
//         else if(this.props.type === "tradecard"){
//             return <TradecardPage databaseEntry={this.props.databaseEntry}/>
//         }
//         else{
//             <h1>PAGE NOT FOUND</h1>
//         }
//     }
// }
class TradecardPage extends React.Component {
  render() {
    return <h1>TRADECARD DETAILS PAGE</h1>;
  }
}
//Props: databaseEntry (frontImage, description, title, time, publisher, location, subject, size, tagArray)
class PostcardPage extends React.Component {
  render() {
    return (
      <div className="postcardPageMain">
        {this.props.databaseEntry ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <td width="65%">
                    <img
                      src={this.props.databaseEntry.imageFront}
                      alt="Postcard Stuff"
                    />
                  </td>
                  <td className="informationpt2">
                    <PostcardInformation
                      databaseEntry={this.props.databaseEntry}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h1 className="description">Brief Description:</h1>
            <h3 className="actualDescriptionText">
              {this.props.databaseEntry.description}
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
function PostcardInformation(props){
    return(<div className="information">
        <div style={{flexDirection: "row"}}>
            <button className="postcardButton">Flip</button>
            <button className="postcardButton">Compare</button>
        </div>
        <h2>Publisher: {props.databaseEntry.publisher}</h2>
        <h2>Time: {props.databaseEntry.time}</h2>
        <h2>Location: {props.databaseEntry.location}</h2>
        <h2>Subject: {props.databaseEntry.subject}</h2>
        <h2>Size: {props.databaseEntry.size}</h2>
        {/* <h2>{"Tags: " + props.databaseEntry.tagArray.reduce((acc,x)=> {return (acc + ", " + x )})}</h2> */}
    </div>)
}
//export default Details;
