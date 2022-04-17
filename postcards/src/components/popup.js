import "../styles/popup.css"
function PopUp(props){
    return (<div id="popUp" className="background-blur">
        <div className="popup-box">
            <h1 id="triggerTitle">CONTENT WARNING</h1>
            <p>This digital history exhibition contains degrading depictions of women and people of color from the late 1800s and early 1900s</p>
            <button className="confirmButton" onClick={()=>{document.getElementById("popUp").style.display = "none"}}>
                Please click if you wish to continue
            </button>
        </div>
    </div>)
}
export default PopUp;