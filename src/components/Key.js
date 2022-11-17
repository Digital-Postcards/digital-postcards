import React from 'react'
import "../styles/key.css";

const Key = () => {
  return (
    <div class = 'keyRow'>
        <button class = 'mapKey' style = {{color: "#ff0000", borderColor: "#ff0000"}}>British</button>
        <button class = 'mapKey' style = {{color: "#0000FF", borderColor: "#0000FF"}}>French</button>
        <button class = 'mapKey' style = {{color: "#00FF00", borderColor: "#00FF00"}}>Ottoman</button>
        <button class = 'mapKey' style = {{color: "#FFFF00", borderColor: "#FFFF00"}}>Dutch</button>
        <button class = 'mapKey' style = {{color: "#A020F0", borderColor: "#A020F0"}}>American</button>
        <button class = 'mapKey' style = {{color: "#FFA500", borderColor: "#FFA500"}}>No Empire</button>
    </div>
  )
}

export default Key