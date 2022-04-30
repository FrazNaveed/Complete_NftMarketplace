import { React, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./create.css";

const Create = () => {
  const maxSize = 12000000;
  const [selectedFile, setSelectedFile] = useState(null);
  const [path, setPath] = useState("");
  const [mintMessage, setMintMessage] = useState("");
  const [mintMessageState, setMintMessageState] = useState("success");

  const [walletAddress, setWalletAddress] = useState("");
  const [mintTitle, setTitle] = useState("");
  const [mintPrice, setPrice] = useState(0);
  const [dexcription, setDexcription] = useState("");

  const onDrop = (acceptedFile) => {
    if (acceptedFile.length == 0) {
      alert("File size must be less than 12mb");
    } else {
      setSelectedFile(acceptedFile);
      setPath((acceptedFile[0].path).toString());
      console.log(path);
    }
  };


  const mintNFT = async (e) => {
    e.preventDefault();
    const { ethereum } = window;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
    console.log(walletAddress); 
    if (
      mintTitle == "" ||
      mintPrice == 0 ||
      mintPrice == "" ||
      dexcription == "" || 
      selectedFile.length === 0
    ) {
      setMintMessage(
        "One of the required fields were left empty. Please try again"
      );
      setMintMessageState("error");
      return;
    }

    // const formData = {
    //   msgsender: walletAddress,
    //   title: mintTitle,
    //   price: mintPrice,
    //   category: mintCategory,
    //   description: dexcription,
    // }
    const formData = new FormData();
    formData.append("msgsender", walletAddress);
    formData.append("title", mintTitle);
    formData.append("price", mintPrice);
    formData.append("description", dexcription);
    formData.append("media", selectedFile[0]);

    setMintMessage("Uploading your video NFT on IPFS");
    setMintMessageState("info");
    console.log(formData);

    const response = await axios.post(
      `http://localhost:3000/mintNFT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status == 200) {
      setMintMessage("Sending transaction");
      setMintMessageState("info");
      var params = [
        {
          from: walletAddress,
          ...response.data.signRequired,
        },
      ];
      const signed = await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      setMintMessage(
        "Transaction successfully sent, <a href='https://ropsten.etherscan.io/tx/" +
          signed +
          "' target='_blank'>view on etherescan</a>"
      );
      setMintMessageState("success");
    } else {
      setMintMessage(response.data.error);
      setMintMessageState("error");
    }
  };

  return (
    <div className="container">
      <div className="background">
      <h1>Create an NFT</h1>
      <form>
        <Dropzone
          multiple={false}
          onDrop={onDrop}
          accept="video/*"
          maxSize={maxSize}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
            return (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop it!"}
                {isDragReject && "File type not accepted, sorry!"}
              </div>
            );
          }}
        </Dropzone>

        <p>{path}</p>
        <input type={Text} placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
        <input type={Text} placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}} />
        <textarea placeholder="Description" onChange={(e)=>{setDexcription(e.target.value)}}></textarea>
        <button className="mintBtn" onClick={mintNFT}>Mint</button>
      </form>

      <a>{mintMessage}</a>
      {/* <p>{mintMessageState}</p> */}
      </div>
    </div>
  );
};

export default Create;
