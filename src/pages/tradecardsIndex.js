import "../styles/index.css";
import ExploreTradecardEntry from "../components/ExploreTradecardEntry";
import PopUp from "../components/popup";

export default function TradecardsIndex(props) {
  if(props.show) {
    return (
        <div className="home">
            <PopUp setShow={props.setShow} id="popupComponent"/>
        </div>
        
    );
  }
  else{
    return (
      <div>
        {props.tradecardData ? (
          props.tradecardData.map((card) => {
            return (
              <ExploreTradecardEntry card={card}/>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}