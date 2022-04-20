import {NavLink} from "react-router-dom";
import '../styles/navbar.css';
function NavBar(){
    return (
        <div position = "static" className="IAMNAVBAR">
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/"> Home </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/explore"> Explore </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/map"> Map </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/"> Tradecards </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/"> Postcards </NavLink>
                {/* <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/essays"> Essay Articles </NavLink> */}
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/narration"> Narrations </NavLink>
        </div>
    )
}
export default NavBar;