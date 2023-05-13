import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
function NavBar() {
  return (
    <div position="static" className="navbar-container">
      <div className="nav-item-container">
        <NavLink
          className={(navData) =>
            `${navData.isActive ? "active" : ""} nav-item`
          }
          to="/"
        >
          {" "}
          Home{" "}
        </NavLink>
        <NavLink
          className={(navData) =>
            `${navData.isActive ? "active" : ""} nav-item`
          }
          to="/explore"
        >
          {" "}
          Explore{" "}
        </NavLink>
        <NavLink
          className={(navData) =>
            `${navData.isActive ? "active" : ""} nav-item`
          }
          to="/map"
        >
          {" "}
          Map{" "}
        </NavLink>
        <NavLink
          className={(navData) =>
            `${navData.isActive ? "active" : ""} nav-item`
          }
          to="/tradecards"
        >
          {" "}
          Tradecards{" "}
        </NavLink>
        <NavLink
          className={(navData) =>
            `${navData.isActive ? "active" : ""} nav-item`
          }
          to="/postcards"
        >
          {" "}
          Postcards{" "}
        </NavLink>
        {
          <NavLink
            className={(navData) =>
              `${navData.isActive ? "active" : ""} nav-item`
            }
            to="/about"
          >
            {" "}
            About{" "}
          </NavLink>
        }
      </div>
      <div>
        <span className="content-warning">
          Content Warning! This digital exhibition
          <br />
          contains degrading depictions.
        </span>
      </div>
    </div>
  );
}
export default NavBar;
