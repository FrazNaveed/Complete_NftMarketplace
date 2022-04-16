import React from "react";
import "./create.css";

const Create = () => {
  return (
    <div className="container">
      <h1>Create an NFT</h1>
      <form>
        <input type="file" placeholder="Select File"/>
        <input type={Text} placeholder="Title" />
        {/* Check to take it in number or text in API */}
        <input type={Text} placeholder="Price" />  
        <textarea placeholder="Description"></textarea>
        <button>Mint</button>
      </form>
    </div>
  );
};

export default Create;
