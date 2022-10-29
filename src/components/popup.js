import { useEffect } from "react";
import "../styles/popup.css"
function PopUp(props){
    return (<div id="popUp" className="background-blur">
        <div className="popup-box">
            <h1 id="triggerTitle">CONTENT WARNING</h1>
            <p id="triggerBody"> This digital history exhibition contains degrading depictions of women and people of color from the late 1800s and early 1900s. The tradecards and postcards (many of which are racist and sexist) have been historically contextualized to understand the visual culture of domestic labor in the age of New Imperialism, Jim Crow segregation, and Asian Exclusion.</p>
            <button id="confirmButton" onClick={()=>{document.getElementById("popUp").style.display = "none"}}>
                Please click if you wish to continue
            </button>
        </div>
    </div>)
}
export default PopUp;