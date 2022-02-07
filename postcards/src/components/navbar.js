import App from "../App";
import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import {Link} from "react-router-dom"

function NavBar(){
    return (
        <AppBar position = "static">
            <CssBaseline/>
            <Toolbar>
                <div className = "test">
                    <Link to="/"> Home </Link>
                    <Link to="/map"> Map </Link>
                    <Link to="/explore"> Explore </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;