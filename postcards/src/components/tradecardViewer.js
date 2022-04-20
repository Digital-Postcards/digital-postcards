import React from "react"
import ReactDOM from 'react-dom';
import {MapInteractionCSS} from 'react-map-interaction'
import TradeCardTree from "./TradecardTree"
import { Table, TableRow, TableCell } from '@mui/material';
import "../styles/cardImage.css"
class TradeCardViewer extends React.Component{
    constructor(props){
        super(props);
        this.tradecardTree = new TradeCardTree(
            {
                value:imageArrayReference[0],
                left:{
                    value:imageArrayReference[1],
                    left:{
                        value:imageArrayReference[2]
                    }
                },
                right:{
                    value:imageArrayReference[3]
                },
                up:{
                    value:imageArrayReference[4]
                },
                down:{
                    value:imageArrayReference[5]
                }
            }
        );
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
        return <TableCell key={"" + rowIndex + columnArrayElement} id = {"" + rowIndex + columnArrayElement}>
        </TableCell>
    }
    populateElements(){
        for(let imageNode of this.tradecardTree.postOrderTraversal()){
            ReactDOM.render(<CardImageComponent center={this.center} toggle ={this.toggleCardsOnOff} id={"node" +  (this.center.y - imageNode.location.y) + (this.center.x + imageNode.location.x)} node={imageNode}/>,
            document.getElementById("" +  (this.center.y - imageNode.location.y) + (this.center.x + imageNode.location.x)));
        }
    }
    toggleCardsOnOff(node){
        //If you are getting rid of cards, you can take advantage of the fact that only closing needs you to do recursion on the later cards. Whereas adding only adds one at a time.
        let element = document.getElementById(JSON.stringify(node.location))
        element.style.display = "block";
    }

    render(){
        return(<MapInteractionCSS>
            <Table padding="none">
                {ZerotoNumArray(this.gridDimensions.x).map(this.createTableRow)}
            </Table>
        </MapInteractionCSS>)
    }
    componentDidMount(){
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
                    <th>
                        {(buttonArray[0])? <button className="top" onClick={()=>{props.toggle(props.node.children[0])}}></button>:<></>}
                    </th>
                </tr>
                <tr>
                    <th>{(buttonArray[2])? <button className="left" onClick={()=>{props.toggle(props.node.children[2])}}></button>:<></>}</th>
                    <th><img src={props.node.value}></img></th>
                    <th>{(buttonArray[3])? <button className="right" onClick={()=>{props.toggle(props.node.children[3])}}></button>:<></>}</th>
                </tr>
                <tr>
                    <th colSpan={3}>
                        {(buttonArray[1])? <button className="bottom" onClick={()=>{props.toggle(props.node.children[1])}}></button>:<></>}
                    </th>
                </tr>
            </tbody>
        </table>
        </div>
    )    
}
let imageArrayReference = ["","","","","",""]
export default TradeCardViewer;