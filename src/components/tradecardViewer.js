import React, { useEffect } from "react"
import ReactDOM from 'react-dom';
import {MapInteractionCSS} from 'react-map-interaction'
import TradeCardTree from "./TradecardTree"
import { Table, TableRow, TableCell } from '@mui/material';
import "../styles/cardImage.css"
// import testJSON from "./testJSON.js"
import { Paper } from "@mui/material";
import ReactCardFlip from "react-card-flip";
class TradeCardViewer extends React.Component{
    constructor(props){
        super(props);
        this.tradecardTree = new TradeCardTree(props.data); //props.data
        this.gridDimensions = this.tradecardTree.findEndsFromCenter();
        this.center = {x:this.gridDimensions[2],y:this.gridDimensions[0]}
        this.gridDimensions = {x:this.gridDimensions[0] + this.gridDimensions[1] + 1,y:this.gridDimensions[2] + this.gridDimensions[3] + 1}
        this.state={selected:1};
        this.createTableElement = this.createTableElement.bind(this);
        this.createTableRow = this.createTableRow.bind(this);
        this.populateElements = this.populateElements.bind(this);
        this.toggleCardsOnOff = this.toggleCardsOnOff.bind(this);
    }
    createTableRow(rowArrayElement){
        return <TableRow key = {"row" + rowArrayElement} id = {"row" + rowArrayElement}>
            {ZerotoNumArray(this.gridDimensions.y).map((x,i)=>{return this.createTableElement(i, rowArrayElement)})}
        </TableRow>
    }
    createTableElement(columnArrayElement, rowIndex){
        return <TableCell className="getRidOfBottomLinePlease" key={"" + rowIndex + columnArrayElement} id = {"" + rowIndex + columnArrayElement}>
        </TableCell> 
    }
    populateElements(){
        for(let imageNode of this.tradecardTree.postOrderTraversal()){
            ReactDOM.render(<CardImageComponent flipped={this.props.flipped} center={this.center} toggle ={this.toggleCardsOnOff} id={"node" +  (this.center.y - imageNode.location.y) + (this.center.x + imageNode.location.x)} node={imageNode}/>,
            document.getElementById("" +  (this.center.y - imageNode.location.y) + (this.center.x + imageNode.location.x)));
        }
    }
    toggleCardsOnOff(node){
        //If you are getting rid of cards, you can take advantage of the fact that only closing needs you to do recursion on the later cards. Whereas adding only adds one at a time.
        let element = document.getElementById(JSON.stringify(node.location))
        element.style.display = (element.style.display === "none"||element.style.display === "")? "block":"none";
        for(let child of node.children.filter((x)=>x!==null)){
            this.closeAllChildCards(child);
        } 
    }
    closeAllChildCards(node){
        //If you are getting rid of cards, you can take advantage of the fact that only closing needs you to do recursion on the later cards. Whereas adding only adds one at a time.
        document.getElementById(JSON.stringify(node.location)).style.display="none";
        for(let child of node.children.filter((x)=>x!==null)){
            this.closeAllChildCards(child);
        } 
    }

    render(){
        console.log("tcrender");
        return(
        <Paper elevation={24} className="TradeCardViewContainer">
            <MapInteractionCSS>
            <Table padding="none">
                {ZerotoNumArray(this.gridDimensions.x).map(this.createTableRow)}
            </Table>
        </MapInteractionCSS>
        </Paper>)
    }
    componentDidMount(){
        this.populateElements();
    }
    componentDidUpdate(){
        this.populateElements();
    }
}
function ZerotoNumArray(num){
    return Array.from({length: num}, (_, index) => index)
}
function CardImageComponent(props){
    let buttonArray = props.node.children.map((x)=>{return x !== null})
    return (
        <div id={JSON.stringify(props.node.location)}
        className={(props.node.location.x === 0 && props.node.location.y === 0)? "":"child"}>
        <table>
            <thead></thead>
            <tbody>
                <tr>
                    <th colSpan={3} onClick={()=>{props.toggle(props.node.children[0])}}  className={(buttonArray[0])? "topArea":""}>
                        <p></p>
                    </th>
                </tr>
                <tr>
                    <th onClick={()=>{props.toggle(props.node.children[2])}} className={(buttonArray[2])? "leftArea":"horizontal"}>
                    </th>
                    <th>
                        <ReactCardFlip isFlipped={props.flipped}>
                            <img src={props.node.value.imageFront}/>
                            <img src={props.node.value.imageBack}/>
                        </ReactCardFlip>
                    </th>
                    <th onClick={()=>{props.toggle(props.node.children[3])}} className={(buttonArray[3])? "rightArea":"horizontal"}></th>
                </tr>
                <tr>
                    <th colSpan={3} onClick={()=>{props.toggle(props.node.children[1])}}  className={(buttonArray[0])? "bottomArea":""}>
                        <p></p>
                    </th>
                </tr>
            </tbody>
        </table>
        </div>
    )    
}
export default TradeCardViewer;