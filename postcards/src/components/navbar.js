import {AppBar, rgbToHex, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import '../styles/navbar.css';
function NavBar(){
    return (
        <AppBar style={{backgroundColor: rgbToHex("#E1C98A")}} position = "static">
            <Toolbar min-height=".5rem" disableGutters >
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/"> Home </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/map"> Map </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/explore"> Explore </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/essays"> Essay Articles </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/narration"> Narrations </NavLink>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;