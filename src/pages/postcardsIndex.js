import "../styles/index.css";
import ExplorePostcardEntry from "../components/ExplorePostcardEntry";
import PopUp from "../components/popup";

export default function PostcardsIndex(props) {
  if (props.show) {
    return (
      <div className="home">
        <PopUp setShow={props.setShow} id="popupComponent" />
      </div>
    );
  } else {
    return (
      <>
        <div>
          {props.postcardData ? (
            props.postcardData.map((card) => {
              return <ExplorePostcardEntry card={card} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </>
    );
  }
}
