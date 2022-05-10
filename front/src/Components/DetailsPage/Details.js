import { useState, useEffect, React } from "react";
import "./details.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  
  let { tokenId } = useParams();
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenData, setTokenData] = useState({});


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

      if (response.status == 200) {
        for (var i = 0; i < response.data.signRequired.length; i++) {
          // setTokenActionMessage("Sending transaction#" + (i + 1));
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
        //   "Congratulations! Your NFT is on its way to you."
        // );
      } else {
        // setTokenActionMessage(
        //   "An error occured while crafting transactions, try refreshing the page."
        // );
        alert("hello error")
      }
    }
  };

  useEffect(async () => {
    if (!window.ethereum) {
      alert("Intall Metamask Wallet");
    }
    let address = await window.ethereum.selectedAddress;
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    setWalletAddress(address ? address.toString() : "");

    const uri = await axios.get(`http://localhost:8080/getTokenURI`, {
      params: { tokenId: tokenId },
    });

    console.log(uri.data.result);
    const price = await axios.get(`http://localhost:8080/getTokenPrice`, {
      params: { tokenId: tokenId },
    });

    const uriResponse = await axios.get(uri.data.result);

    setTokenData({
      ...uriResponse.data,
      price: price.data.result,
    });

    const history = await axios.get(`http://localhost:8080/getNftHistory`, {
      params: { tokenId: tokenId },
    });

    console.log(history.data.result);

    let buttonHandler = () => {
      if (tokenData.creator != walletAddress) {
      }
    };
  }, [walletAddress]);

  console.log(tokenData);
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
          <h3>Price:</h3>
          <p>
            {tokenData.price / Math.pow(10, 18)}{" "}
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
          <button onClick={buyNFT}>Bid</button>
        </div>
      </div>

      <div className="header">
        <h2>Buying History:</h2>
      </div>

      <div className="historySection">
        <table>
          <thead className="tHeader">
            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">FROM</td>
              <td className="tableCell">TO</td>
              <td className="tableCell">PRICE</td>
              <td className="tableCell">DATE</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>

            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>

            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>

            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">
                0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0
              </td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
