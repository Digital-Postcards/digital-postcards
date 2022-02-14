import {AppBar, rgbToHex, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import './navbar.css';
function NavBar(){
    return (
        <AppBar style={{backgroundColor: rgbToHex("#E1C98A")}} position = "static">
            <Toolbar min-height=".5rem" disableGutters >
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/"> Home </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/map"> Map </NavLink>
                <NavLink className={(navData) => `${navData.isActive ? "active" : ""} nav-item`} to="/explore"> Explore </NavLink>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;