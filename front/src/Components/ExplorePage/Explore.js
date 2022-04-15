import React from "react";
import "./explore.css";
// import Card from "../populatecard/populateCard";
import { Link } from "react-router-dom";
const Explore = () => {
  return (
    <>
      <p>Explore</p>
      <div className="card">
        <Link to="/details">
          <div className="card-image"> </div>
          <div className="card-text">
            <span className="date">4 days ago</span>
            <h4>Hello</h4>
          </div>
          <div className="card-stats">
            <div className="stats">
              <div className="value">
                4<sup>m</sup>
              </div>
              <div className="type">reads</div>
            </div>

            <div className="stats border">
              <div className="value">5148</div>
              <div className="type">view</div>
            </div>

            <div className="stats">
              <div className="value">32</div>
              <div className="type">comments</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Explore;
