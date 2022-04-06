import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
     <div className="navbar">
       <h4>NFT Marketplace</h4>
     <nav>
          <ul className="items">
            <li>
              <NavLink to="/" activeClassName="active">
                {" "}
                Explore{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/popular" activeClassName="active">
                {" "}
                Popular{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/sale" activeClassName="active">
                {" "}
                Sale{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/collection" activeClassName="active">
                {" "}
                My Collection{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/creators" activeClassName="active">
                {" "}
                Creators{" "}
              </NavLink>
            </li>
          </ul>

      </nav>

          <div className="buttons">
          <NavLink to="/create">
              <button><span>Create</span></button>
            </NavLink>
          <button>200 Tokens</button>
          </div>

     </div>
    </>
  );
};

export default Navbar;
