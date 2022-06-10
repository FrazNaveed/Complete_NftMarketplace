import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from ".././Spinner/Spinner";
import "./collection.css";

const Collection = () => {
  var tokens = [];

  const [nfts, setNfts] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const address = localStorage.getItem("Address");
    setWalletAddress(address);

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getCollections`,
      {
        params: { address: walletAddress },
      }
    );

    for (var i = 0; i < response.data.result.length; i++) {
      try {
        const uri = await axios.get(
          `${process.env.REACT_APP_API_URL}/getTokenURI`,
          {
            params: { tokenId: response.data.result[i] },
          }
        );
        const uriResponse = await axios.get(uri.data.result);
        const price = await axios.get(
          `${process.env.REACT_APP_API_URL}/getTokenPrice`,
          {
            params: { tokenId: response.data.result[i] },
          }
        );

        const owner = await axios.get(
          `${process.env.REACT_APP_API_URL}/ownerOf`,
          {
            params: { tokenId: response.data.result[i] },
          }
        );

        const profile = await axios.get(
          `${process.env.REACT_APP_API_URL}/getProfileInfo`,
          {
            params: {
              address: owner.data.result.toLowerCase(),
            },
          }
        );

        tokens.push({
          ...uriResponse.data,
          tokenId: response.data.result[i],
          price: price.data.result,
          name: profile.data[0].name,
          image: profile.data[0].profileImg,
        });
      } catch (err) {}
    }
    setNfts(tokens);
    setIsLoading(false);
  }, [walletAddress]);
  return (
    <>
      <h1>Collections</h1>
      <div id="containerStyle">
        {isLoading ? (
          <Spinner />
        ) : (
          nfts.map((value, index) => {
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
                    <img src={`${value.image}`} />
                    <h4>{value.name}</h4>
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
          })
        )}
      </div>
    </>
  );
};

export default Collection;
