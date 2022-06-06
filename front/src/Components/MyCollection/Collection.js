import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./collection.css";


const Collection = () => {
  var tokens = [];

  const [nfts, setNfts] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(async () => {
    const address = localStorage.getItem("Address");
    setWalletAddress(address);

    const response = await axios.get(`http://localhost:8080/getCollections`, {
      params: { address: walletAddress },
    });

    for (var i = 0; i < response.data.result.length; i++) {
      try {
        const uri = await axios.get(`http://localhost:8080/getTokenURI`, {
          params: { tokenId: response.data.result[i] },
        });
        const uriResponse = await axios.get(uri.data.result);
        const price = await axios.get(`http://localhost:8080/getTokenPrice`, {
          params: { tokenId: response.data.result[i] },
        });

        tokens.push({
          ...uriResponse.data,
          tokenId: response.data.result[i],
          price: price.data.result,
        });
      } catch (err) {}
    }

    setNfts(tokens);
  }, [walletAddress]);
  return (
    <>

      <h1>Collections</h1>
      <div id="containerStyle">
        {nfts.map((value, index) => {
          return (
            <div className="card" key={index}>
              <Link to={`/details/${value.tokenId}`}>
                <div className="upperSection">
                  <video
                    src={value.media}
                    preload="auto|metadata|none"
                    className="vid"
                    style={{ width: "268px" }}
                  />
                </div>
                <div className="lowerSection">
                  <img src="https://picsum.photos/50/50" />
                  <h4>Tenz</h4>
                  <p>
                    Price:{" "}
                    <span style={{ color: "orangered", fontWeight: "bold" }}>
                      {value.price / Math.pow(10, 18)} Tokens
                    </span>
                  </p>
                </div>

                <h2> {value.title}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Collection;
