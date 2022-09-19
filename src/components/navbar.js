import {NavLink} from "react-router-dom";
import '../styles/navbar.css';
function NavBar(){
    return (
        <div position = "static" className="IAMNAVBAR">
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/"> <i>Home</i> </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/explore"> <i>Explore</i> </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/map"> <i>Map</i> </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/tradecards"> <i>Tradecards</i> </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/postcards"> <i>Postcards</i> </NavLink>
                {/* <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/essays"> Essay Articles </NavLink> */}
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/narration"> <i>Narrations</i> </NavLink>
        </div>
    )
}
export default NavBar;