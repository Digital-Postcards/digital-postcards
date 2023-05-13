import { useState, useEffect } from "react";
import { TbDeviceMobileRotated, TbRotateClockwise } from "react-icons/tb";
import "../styles/popup.css";

function PopUp(props) {
  let [screen, setScreen] = useState({ width: 0, height: 0 });
  let onClick = () => {
    document.getElementById("popUp").style.display = "none";
    props.setShow(false);
  };
  useEffect(() => {
    setScreen({ width: window.innerWidth, height: window.innerHeight });
  }, [window.innerWidth, window.innerHeight]);
  return (
    <div id="popUp" className="background-blur">
      <div
        className={
          screen.width < 450 && screen.height < 950
            ? "mobile-popup-box"
            : "popup-box"
        }
      >
        <h1
          className={
            screen.width < 450 && screen.height < 950
              ? "mobile-trigger-title"
              : "triggerTitle"
          }
        >
          CONTENT WARNING
        </h1>
        <p
          className={
            screen.width < 450 && screen.height < 950
              ? "mobile-trigger-body"
              : "triggerBody"
          }
        >
          {" "}
          This digital history exhibition contains degrading depictions of women
          and people of color from the late 1800s and early 1900s. The
          tradecards and postcards (many of which are racist and sexist) have
          been historically contextualized to understand the visual culture of
          domestic labor in the age of New Imperialism, Jim Crow segregation,
          and Asian Exclusion.
        </p>
        {screen.width < 450 && screen.height < 950 ? (
          <>
            <TbRotateClockwise size="4vh" />
            <TbDeviceMobileRotated size="4vh" />
          </>
        ) : null}
        <button
          className={
            screen.width < 450 && screen.height < 950
              ? "mobile-confirm-button"
              : "confirmButton"
          }
          onClick={onClick}
        >
          Please click if you wish to continue
        </button>
      </div>
    </div>
  );
}
export default PopUp;
