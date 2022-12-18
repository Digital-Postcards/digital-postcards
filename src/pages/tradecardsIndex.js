import "../styles/index.css";
import ExploreTradecardEntry from "../components/ExploreTradecardEntry";

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
}