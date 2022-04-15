import React from "react";
import "./create.css";

const Create = () => {
  return (
    <div className="container">
        <div className="imageSection">
          <input type="file" accept="video/*" />
        </div>

        <div className="inputSection">
          <h2>Create an NFT</h2>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button>MINT</button>
        </div>
    </div>
  );
};

export default Create;
