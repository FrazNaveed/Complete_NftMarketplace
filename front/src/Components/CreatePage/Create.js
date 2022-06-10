import { React, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ImageIcon from "@mui/icons-material/Image";
import "./create.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "black",
  border: "1px solid orangered",
  boxShadow: 24,
  p: 4,
  color: "white",
  borderRadius: "12px",
};

const Create = () => {
  const maxSize = 2097152;
  const [selectedFile, setSelectedFile] = useState(null);
  const [path, setPath] = useState("");

  const [mintMessage, setMintMessage] = useState("");
  const [mintMessageState, setMintMessageState] = useState("success");
  const [mintTitle, setTitle] = useState("");
  const [mintPrice, setPrice] = useState(0);
  const [dexcription, setDexcription] = useState("");

  const [filePath, setFilePath] = useState("");
  const [base64Img, setbase64Img] = useState("");
  const [profileName, setProfileName] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDrop = (acceptedFile) => {
    if (acceptedFile.length == 0) {
      alert("File size must be less than 2mb");
    } else {
      setSelectedFile(acceptedFile);
      setPath(acceptedFile[0].path.toString());
    }
  };

  const mintNFT = async (e) => {
    e.preventDefault();
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

    const formData = new FormData();
    formData.append("msgsender", localStorage.getItem("Address"));
    formData.append("title", mintTitle);
    formData.append("price", mintPrice);
    formData.append("description", dexcription);
    formData.append("media", selectedFile[0]);

    setMintMessage("Uploading your video NFT on IPFS");
    setMintMessageState("info");
    console.log(formData);

    const response = await axios.post(
      `http://localhost:8080/mintNFT`,
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
          from: localStorage.getItem("Address"),
          ...response.data.signRequired,
        },
      ];
      const signed = await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      setMintMessage(
        "Transaction successfully sent, <a href='https://testnet.bscscan.com/tx/" +
          signed +
          "' target='_blank'>view on etherescan</a>"
      );
      setMintMessageState("success");
    } else {
      setMintMessage(response.data.error);
      setMintMessageState("error");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const convertImageToBase64 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setbase64Img(base64);
  };

  const SubmitProfile = async () => {
    await axios.post(`http://localhost:8080/registerProfile`, {
      name: profileName,
      address: localStorage.getItem("Address"),
      image: base64Img,
    });
  };
  useEffect(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getProfileInfo`,
      {
        params: {
          address: localStorage.getItem("Address"),
        },
      }
    );
    if (res.data.length == 0) {
      handleOpen();
    }
  });

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
          <input
            type={Text}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type={Text}
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <textarea
            placeholder="Description"
            onChange={(e) => {
              setDexcription(e.target.value);
            }}
          ></textarea>
          <button className="mintBtn" onClick={mintNFT}>
            Mint
          </button>
        </form>

        <a>{mintMessage}</a>
        {/* <p>{mintMessageState}</p> */}
      </div>

      {/* <button
        onClick={() => {
          handleOpen();
        }}
      >
        Open modal
      </button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Register Profile</h1>

          <label for="inputTag" back>
            <div id="registerDiv">
              <ImageIcon placeholder="Select Image" />
              {filePath ? <span>{filePath}</span> : <span>Select Image</span>}
            </div>

            <input
              onChange={(e) => {
                setFilePath(e.target.value);
                convertImageToBase64(e);
              }}
              style={{ display: "none" }}
              accept="image/jpeg"
              id="inputTag"
              type="file"
            />
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setProfileName(e.target.value);
            }}
            style={{ width: "255px" }}
          />

          <button className="registerButton" onClick={SubmitProfile}>
            Register
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Create;
