import { useState, useEffect, React } from "react";
import "./details.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import History from "../HIstorySection/History";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

const buttonStyle = {
  position: "relative",
  border: "4px solid transparent",
  borderRadius: "10px",
  background: "black",
  backgroundClip: "paddingBox",
  width: "140px",
  height: "45px",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  border: "1px solid orangered",
  cursor: "pointer",
  boxShadow: "0px 4px 10px rgb(46, 118, 226, 0.4)",
  marginTop: "4px",
};

const Details = () => {
  let { tokenId } = useParams();
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenData, setTokenData] = useState({});

  const [bidModalTrue, setBidModalTrue] = useState(false);
  const [auctionModalTrue, setAuctionModalTrue] = useState(false);

  // Putting on Auction states set from Modal
  const [startAuctionPrice, setStartAuctionPrice] = useState("");
  const [auctionEndDate, setAuctionEndDate] = useState();
  const [bidprice, setBidPrice] = useState("");

  const [startAuctionMessage, setStartAuctionMessage] = useState("");
  const [startAuctionMessageState, setStartAuctionMessageState] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buyNFT = async () => {
    let address = await window.ethereum.selectedAddress;
    const balance = await axios.get(`http://localhost:8080/tokenBalanceOf`, {
      params: { address: address },
    });

    const price = await axios.get(`http://localhost:8080/getTokenPrice`, {
      params: { tokenId: tokenId },
    });

    if (balance >= price) {
      const response = await axios.post(`http://localhost:8080/buyNFT`, {
        msgsender: walletAddress,
        price: tokenData.price,
        tokenId: tokenId,
      });

      const tx = response.data.signRequired;

      if (response.status == 200) {
        for (let txObj of tx) {
          var params = [txObj];

          const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params,
          });

          let txReceipt = null;
          while (txReceipt == null) {
            txReceipt = await window.ethereum.request({
              method: "eth_getTransactionReceipt",
              params: [txHash],
            });
          }
        }

        window.location.reload();

        // setTokenActionMessage(
        //   "Congratulations! Your NFT is on its way to you."
        // );
      } else {
        // setTokenActionMessage(
        //   "An error occured while crafting transactions, try refreshing the page."
        // );
        alert("hello error");
      }
    }
  };

  let startAuction = async () => {
    if (
      startAuctionPrice == "" ||
      startAuctionPrice < 0 ||
      startAuctionPrice < tokenData.price / Math.pow(10, 18)
    ) {
      alert("Price must not be empty, 0 or less than prev price");
      return;
    }
    var selectedTimestamp = new Date(auctionEndDate).getTime() / 1000;
    if (auctionEndDate == "" || selectedTimestamp < Date.now() / 1000) {
      alert("Error: Please enter a valid date in future.");
      return;
    }
    const response = await axios.post(`http://localhost:8080/startAuction`, {
      tokenId: tokenId,
      startPrice: startAuctionPrice,
      endTime: selectedTimestamp,
      tokenOwner: walletAddress,
    });
    if (response.status == 200) {
      // setStartAuctionMessage("Sending transaction to the network...");
      // setStartAuctionMessageState("info");
      var params = [
        {
          ...response.data.signRequired,
        },
      ];
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      // setStartAuctionMessage(
      //     "Auction start request sent, please wait for transaction to be mined."
      // );
      // setStartAuctionMessageState("success");
    } else {
      // setStartAuctionMessage(
      //     "An error occured while crafting transactions, try refreshing the page."
      // );
      // setStartAuctionMessageState("error");
    }
  };

  const stopAuction = async () => {
    const response = await axios.post(`http://localhost:8080/stopAuction`, {
      msgsender: walletAddress,
      tokenId: tokenId,
    });

    if (response.status == 200) {
      for (var i = 0; i < response.data.signRequired.length; i++) {
        // setTokenActionMessage(
        //     "Sending transaction#" + (i + 1) + " to the network..."
        // );
        var params = [
          {
            ...response.data.signRequired[i],
          },
        ];
        await window.ethereum.request({
          method: "eth_sendTransaction",
          params,
        });

       
      }
      window.location.reload();
      // setTokenActionMessage(
      //     "Auction stop request sent to network, please wait for transaction to be mined."
      // );
    } else {
      // setTokenActionMessage(
      //     "An error occured while crafting transactions, try refreshing the page."
      // );
    }
  };

  let updateBid = async () => {
    // setPriceUpdateMessage("Contacting gateway to craft transaction...");
    // setPriceUpdateMessageState("info");
    
    if (bidprice == "" || bidprice < 0 || bidprice < tokenData.price) {
        // setPriceUpdateMessage("Error: Please enter a valid price.");
        // setPriceUpdateMessageState("error");

        alert("Bid price shouldn't be empty, zero or less than previous bid");

        return;
    }
    const response = await axios.post(
        `http://localhost:8080/updateBid`,
        {
            msgsender: walletAddress,
            newPrice: bidprice,
            tokenId: tokenId
        }
    );
    const tx = response.data.signRequired;
      console.log(tx);
    if (response.status == 200) {
        // setPriceUpdateMessage("Sending transaction to the network...");
        // setPriceUpdateMessageState("info");
        for (let txObj of tx) {
          var params = [txObj];

          const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params,
          });

          let txReceipt = null;
          while (txReceipt == null) {
            txReceipt = await window.ethereum.request({
              method: "eth_getTransactionReceipt",
              params: [txHash],
            });
          }
        }

        window.location.reload();




        // setPriceUpdateMessage(
        //     "Price update request sent, please wait for transaction to be mined."
        // );
        // setPriceUpdateMessageState("success");
    } else {
        // setPriceUpdateMessage(
        //     "An error occured while crafting transactions, try refreshing the page."
        // );
        // setPriceUpdateMessageState("error");
    }
  };

  let buttonHandler = () => {
    if (tokenData.owner != walletAddress) {
      setBidModalTrue(true);
      handleOpen();
    } else if (tokenData.owner == walletAddress && !tokenData.tknBid) {
      setAuctionModalTrue(true);
      handleOpen();
    }
  };

  useEffect(async () => {
    if (!window.ethereum) {
      alert("Intall Metamask Wallet");
    }

    const address = await window.ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    setWalletAddress(address[0]);

    const uri = await axios.get(`http://localhost:8080/getTokenURI`, {
      params: { tokenId: tokenId },
    });
    const price = await axios.get(`http://localhost:8080/getTokenPrice`, {
      params: { tokenId: tokenId },
    });

    const owner = await axios.get(`http://localhost:8080/ownerOf`, {
      params: { tokenId: tokenId },
    });

    const uriResponse = await axios.get(uri.data.result);

    var auctioned = null;
    try {
      auctioned = await axios.get(`http://localhost:8080/auctionInfo`, {
        params: { tokenId: tokenId },
      });
    } catch (err) {}

    if (auctioned) {
      setTokenData({
        ...auctioned.data.result,
        ...uriResponse.data,
        price: price.data.result,
        owner: owner.data.result.toLowerCase(),
      });
    } else {
      setTokenData({
        ...uriResponse.data,
        price: price.data.result,
        owner: owner.data.result.toLowerCase(),
      });
    }
  }, [walletAddress]);

  return (
    <div className="container">
      <div className="vidSection">
        <video className="video" src={tokenData.media} autoPlay muted loop />
      </div>

      <div className="nameNdPrice">
        <div className="name">
          <img src="https://picsum.photos/50/50" />
          <h2>Tenz</h2>
        </div>

        <div className="price">
          <h3>{tokenData.tknBid ? "Current Bid:" : "Current Price:"}</h3>
          <p>
            {tokenData.tknBid
              ? tokenData.tknBid / Math.pow(10, 18)
              : tokenData.price / Math.pow(10, 18)}

            <span style={{ color: "orangered", marginRight: "15px" }}>
              {' '}
              Tokens
            </span>
          </p>
        </div>
      </div>

      <div className="detailNdButton">
        <div className="details">
          <h1>{tokenData.title}:</h1>
          <p> {tokenData.description}</p>
        </div>

        <div className="button">
          {tokenData.owner != walletAddress ? (
            tokenData.tknBid ? (
              <button onClick={buttonHandler}>Place Bid</button>
            ) : (
              <button onClick={buyNFT}>Buy</button>
            )
          ) : (
            tokenData.tknBid && (
              <button onClick={stopAuction}>Stop & Transfer</button>
            )
          )}

          {tokenData.owner == walletAddress && !tokenData.tknBid ? (
            <>
              <button onClick={buttonHandler}>Put on Auction</button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="header">
        <h2>Buying History:</h2>
      </div>
      <History />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {bidModalTrue && (
            <>
              <h2>Enter Your Bid</h2>
              <input
                type="number"
                placeholder="Enter Bid"
                onChange={(e) => setBidPrice(e.target.value)}
                style={{ width: "255px", marginTop: "25px" }}
              />
              <button style={buttonStyle} onClick={updateBid}>
                Bid
              </button>
            </>
          )}

          {auctionModalTrue && (
            <>
              <h2>Enter intial price for Auction</h2>
              <input
                type="number"
                placeholder="Enter Auction Price"
                onChange={(e) => setStartAuctionPrice(e.target.value)}
                style={{ width: "255px", marginTop: "25px" }}
              />
              <input
                type="text"
                onChange={(e) => setAuctionEndDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Enter End Date" 
                min={Date.now()}
                style={{ width: "255px", marginTop: "5px" }}
              />
              <button style={buttonStyle} onClick={startAuction}>
                Auction!
              </button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Details;
