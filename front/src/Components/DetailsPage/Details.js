import { useState, useEffect, React } from "react";
import "./details.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import History from "../HIstorySection/History";
import { ownerDocument } from "@material-ui/core";

const Details = () => {
  let { tokenId } = useParams();
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenData, setTokenData] = useState({});
  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);
  const [showStartAuction, setShowStartAuction] = useState(false);

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
          while(txReceipt == null)
          {
              txReceipt = await window.ethereum.request({
              method: "eth_getTransactionReceipt",
              params:[txHash],
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

  const stopBid = async () => {
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
      // setTokenActionMessage(
      //     "Auction stop request sent to network, please wait for transaction to be mined."
      // );
    } else {
      // setTokenActionMessage(
      //     "An error occured while crafting transactions, try refreshing the page."
      // );
    }
  };

  let buttonHandler = () => {
    if (tokenData.owner != walletAddress) {
      if (tokenData.tknBid) {
        setShowPlaceBid(true);
      } else {
        buyNFT();
      }
    } else {
      if (tokenData.tknBid) {
        stopBid();
      } else {
        setShowPriceUpdate(true);
      }
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

    console.log(uri.data.result);
    const price = await axios.get(`http://localhost:8080/getTokenPrice`, {
      params: { tokenId: tokenId },
    });


    const owner = await axios.get(`http://localhost:8080/ownerOf`, {
      params: { tokenId: tokenId },
    });

    

    const uriResponse = await axios.get(uri.data.result);

    // const history = await axios.get(`http://localhost:8080/getNftHistory`, {
    //   params: { tokenId: tokenId },
    // });

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
        owner: owner.data.result.result.toLowerCase()
      });
    } else {
      setTokenData({
        ...uriResponse.data,
        price: price.data.result,
        owner: owner.data.result.toLowerCase()
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
          {/* <button onClick={() => buttonHandler()}>
            {tokenData.creator != walletAddress
              ? tokenData.tknBid
                ? "Place Bid"
                : "Buy"
              : tokenData.tknBid && "Stop & Transfer"}
          </button> */}
          {tokenData.owner != walletAddress ? (
            tokenData.tknBid ? (
              <button>Place Bid</button>
            ) : (
              <button onClick={buyNFT}>Buy</button>
            )
          ) : (
            tokenData.tknBid && <button>Stop & Transfer</button>
          )}

          {
          tokenData.owner == walletAddress && !tokenData.tknBid ? (
            <>
            <button onClick={() => setShowStartAuction(true)}>
              Put on Auction
            </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="header">
        <h2>Buying History:</h2>
      </div>


            <History/>

    </div>
  );
};

export default Details;
