import React from 'react'
import "../styles/key.css";

const Key = (props) => {
  return (
    <div class = 'keyRowContainer'>
      <div class = 'keyRow'>
          <button class = 'mapKey' style = {{color: "#ff0000", borderColor: "#ff0000"}} onClick = {() => {props.handleChangeEmpire("British")}}>British</button>
          <button class = 'mapKey' style = {{color: "#0000FF", borderColor: "#0000FF"}} onClick = {() => {props.handleChangeEmpire("French")}}>French</button>
          <button class = 'mapKey' style = {{color: "#00FF00", borderColor: "#00FF00"}} onClick = {() => {props.handleChangeEmpire("Ottoman")}}>Ottoman</button>
          <button class = 'mapKey' style = {{color: "#A020F0", borderColor: "#A020F0"}} onClick = {() => {props.handleChangeEmpire("American")}}>American</button>
          <button class = 'mapKey' style = {{color: "#FFA500", borderColor: "#FFA500"}} onClick = {() => {props.handleChangeEmpire("Dutch")}}>Dutch</button>
          <button class = 'mapKey' style = {{color: "#00ABB3", borderColor: "#00ABB3"}} onClick = {() => {props.handleChangeEmpire("Other")}}>Other</button>
          <button class = 'mapKey' style = {{color: "#5e3713", borderColor: "#5e3713"}} onClick = {() => {props.handleChangeEmpire("None")}}>All</button>
      </div>
      <div className = "hover-name"><button class = 'mapKey' style = {{color: "#5e3713", borderColor: "#5e3713"}}>{props.country}</button></div>
    </div>
  )
}

export default Key