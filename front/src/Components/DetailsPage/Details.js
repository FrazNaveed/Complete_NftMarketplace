import React from "react";
import "./details.css";
import video from "../.././Assets/sample.mp4";

const Details = () => {
  return (
    <div className="container">
      <video className="video" src={video} autoPlay muted loop />

      <div className="nameNdPrice">
        <div className="name">
          <img src="https://picsum.photos/50/50" />
          <h2>Tenz</h2>
        </div>

        <div className="price">
          <h3>Price:</h3>
          <p>
            20{" "}
            <span style={{ color: "orangered", marginRight: "15px" }}>
              Tokens
            </span>
          </p>
        </div>
      </div>

      <div className="detailNdButton">
        <div className="details">
          <h1>Getting An ACE:</h1>
          <p>
            {" "}
            lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum
            dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit
            amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem
            ipsum dolor sit amet, lorem ipsum dolor sit amet,
          </p>
        </div>

        <div className="button">
          <button>Make Offer</button>
        </div>
      </div>

      <div className="header">
        <h2>Item History</h2>
      </div>
      <div className="historySection">
        <h4>EVENT</h4>
        <h4>FROM</h4>
        <h4>TO</h4>
        <h4>PRICE</h4>
        <h4>DATE</h4>



      </div>
    </div>
  );
};

export default Details;
