import "../styles/index.css";
import ExplorePostcardEntry from "../components/ExplorePostcardEntry";

export default function PostcardsIndex(props) {
  return (
    <div>
      {props.postcardData ? (
        props.postcardData.map((card) => {
          return (
            <ExplorePostcardEntry card={card}/>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
