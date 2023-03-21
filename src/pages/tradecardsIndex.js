import "../styles/index.css";
import ExploreTradecardEntry from "../components/ExploreTradecardEntry";
<<<<<<< HEAD

export default function TradecardsIndex(props) {
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
=======
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
>>>>>>> dev
}