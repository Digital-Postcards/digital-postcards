import "../styles/popup.css"
function PopUp(props){
    return (<div id="popUp" className="background-blur">
        <div className="popup-box">
            <span className="close-icon" onClick={()=>{
                document.getElementById("popUp").style.display = "none"}
            }>x</span>
            <h1 id="triggerTitle">TRIGGER WARNING</h1>
            <p>The following content may be sensitive. Please proceed with caution.</p>
        </div>
    </div>)
}
export default PopUp;