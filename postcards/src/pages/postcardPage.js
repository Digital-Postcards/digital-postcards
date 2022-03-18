import React from "react";
import '../styles/postcardPage.css'
//Props: databaseEntry (frontImage, description, title, time, publisher, location, subject, size, tagArray)
class PostcardPage extends React.Component{
    render(){
        return (
            <div className="postcardPageMain">
                <table>
                <tbody>
                <tr>
                    <td width="65%">
                        <img src={this.props.databaseEntry.frontImage} alt="Postcard Stuff"/>
                    </td>
                    <td className="informationpt2">
                        <PostcardInformation databaseEntry={this.props.databaseEntry}/>
                    </td>
                </tr> 
                </tbody>
                </table>
                <h1 className="description">Brief Description:</h1>
                <h3 className="actualDescriptionText">{this.props.databaseEntry.description}</h3>
            </div>
        );
    }
}
function PostcardInformation(props){
    return(<div className="information">
        <h1 className="title">{props.databaseEntry.title}</h1>
        <div style={{flexDirection: "row"}}>
            <button className="postcardButton">Flip</button>
            <button className="postcardButton">Compare</button>
        </div>
        <h2>Publisher: {props.databaseEntry.publisher}</h2>
        <h2>Time: {props.databaseEntry.time}</h2>
        <h2>Location: {props.databaseEntry.location}</h2>
        <h2>Subject: {props.databaseEntry.subject}</h2>
        <h2>Size: {props.databaseEntry.size}</h2>
        <h2>{"Tags: " + props.databaseEntry.tagArray.reduce((acc,x)=> {return (acc + ", " + x )})}</h2>
    </div>)
}
export default PostcardPage;