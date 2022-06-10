import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./explore.css";

const Explore = () => {
  var tokens = [];
  var [nfts, setNfts] = useState([]);
  useEffect(async () => {


   
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getTokens`,
      {}
    );
    response.data.result.reverse();
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
              address: (owner.data.result).toLowerCase() ,
            },
          }
        );
        tokens.push({
          ...uriResponse.data,
          tokenId: response.data.result[i],
          price: price.data.result,
          name: profile.data[0].name,
          image: profile.data[0].profileImg
        });
      } catch (err) {}
    }
    setNfts(tokens);

  }, []);


  return (
    <>
      <ul
        style={{
          paddingLeft: "120px",
          marginTop: "50px",
          textDecoration: "none",
        }}
      >
        {" "}
        <li>
          <h1>Explore</h1>
        </li>
      </ul>

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
                  <img src={`${value.image}`} />
                  <h4>{value.name}</h4>
                  <p>
                    Price:{" "}
                    <span style={{ color: "orangered", fontWeight: "bold" }}>
                      {value.price / Math.pow(10, 18)} Tokens
                    </span>
                  </p>
                </div>

                <h2 className="title"> {value.title}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Explore;
