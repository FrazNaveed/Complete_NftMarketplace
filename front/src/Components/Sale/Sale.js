import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "react-countdown";
import "./sale.css";

const Sale = () => {
  const [auctionTokens, setAuctionTokens] = useState([]);

  var tokens = [];

  let timeFormatter = (seconds) => {
    const format = (val) => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    return `${format(hours)}h ${format(minutes)}m ${format(seconds % 60)}s`;
  };

  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllAuctions`);
    for (let i = 0; i < res.data.result.length; i++) {
      var auctionInfo = null;
      try {
        auctionInfo = await axios.get(`${process.env.REACT_APP_API_URL}/auctionInfo`, {
          params: { tokenId: res.data.result[i] },
        });
      } catch (_) {
        continue;
      }
      const uri = await axios.get(`${process.env.REACT_APP_API_URL}/getTokenURI`, {
        params: { tokenId: res.data.result[i] },
      });

      const owner = await axios.get(
        `${process.env.REACT_APP_API_URL}/ownerOf`,
        {
          params: { tokenId: res.data.result[i] },
        }
      );

      const profile = await axios.get(
        `${process.env.REACT_APP_API_URL}/getProfileInfo`,
        {
          params: {
            address: (owner.data.result).toLowerCase() ,
          },
        }
      );


      const tokenResponse = await axios.get(uri.data.result);

      var diff =
        parseInt(auctionInfo.data.result.tknEndTime) -
        Math.floor(Date.now() / 1000);
      if (diff <= 0) continue;
      tokens.push({
        tokenId:res.data.result[i],
        ...auctionInfo.data.result,
        ...tokenResponse.data,
          name: profile.data[0].name,
          image: profile.data[0].profileImg,
        tknEndTime: diff*1000,
      });
    }

    setAuctionTokens(tokens);
  },[]);

  return (
    <>
      <h1>On Sale</h1>

      <div id="containerStyle">
        {auctionTokens.map((value, index) => {
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
                      {value.tknBid / Math.pow(10, 18)} Tokens
                    </span>
                  </p>
                </div>

                <h2 className="title"> {value.title}</h2>

                <div className="tokenEndTime">
                  <p>
                    {" "}
                    <Countdown date={Date.now() + value.tknEndTime} />
                    <span style={{ color: "white" }}>{' '}Left</span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sale;
