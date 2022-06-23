import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from ".././Spinner/Spinner";
import "./transactions.css";

const Transactions = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  var tokens = [];
  const find = async () => {
    setIsLoading(true);
    var startTimestamp = new Date(startDate).getTime() / 1000;
    var endTimestamp = new Date(endDate).getTime() / 1000;

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getHistoricalNFT`
    );
    console.log(res);

    for (var i = 0; i < [...res.data.result].length; i++) {
      if (
        res.data.result[i].returnValues.timestamp >= startTimestamp &&
        res.data.result[i].returnValues.timestamp <= endTimestamp
      ) {
        const uri = await axios.get(
          `${process.env.REACT_APP_API_URL}/getTokenURI`,
          {
            params: { tokenId: res.data.result[i].returnValues.tokenId },
          }
        );

        const uriResponse = await axios.get(uri.data.result);
        const price = await axios.get(
          `${process.env.REACT_APP_API_URL}/getTokenPrice`,
          {
            params: { tokenId: res.data.result[i].returnValues.tokenId },
          }
        );

        const owner = await axios.get(
          `${process.env.REACT_APP_API_URL}/ownerOf`,
          {
            params: { tokenId: res.data.result[i].returnValues.tokenId },
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
          tokenId: res.data.result[i].returnValues.tokenId,
          price: price.data.result,
          name: profile.data[0].name,
          image: profile.data[0].profileImg,
        });
      }
    }
    console.log(tokens);
    setNfts(tokens);
    setIsLoading(false);
  };

  return (
    <div className="transactionsDiv">
      <div className="findBetweenDates">
        <center>
          {" "}
          <h2>Select Dates to find NFTs</h2>
        </center>
        <input
          type="text"
          onChange={(e) => setStartDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          placeholder="Enter Start Date"
          min={Date.now()}
        />

        <input
          type="text"
          onChange={(e) => setEndDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          placeholder="Enter End Date"
          min={Date.now()}
        />
      </div>
      <button className="findButton" onClick={find}>
        Find
      </button>

      {isLoading ? (
        <Spinner />
      ) : (
        <table>
          <thead className="tHeader">
            <tr>
              <td className="tableCell"></td>
              <td className="tableCell">Name</td>
              <td className="tableCell">PRICE</td>
              <td className="tableCell">DETAILS</td>
            </tr>
          </thead>

          {nfts.map((values) => {
            return (
              <tbody>
                <tr>
                  <td className="tableCell">
                    {" "}
                    <img src={`${values.image}`} alt="profile image" />
                  </td>
                  <td className="tableCell">{values.name}</td>
                  <td className="tableCell">
                    {" "}
                    {values.price / Math.pow(10, 18)} TOKENS
                  </td>
                  <td className="tableCell">
                    {" "}
                    <Link to={`/details/${values.tokenId}`}>
                      <p>Link to NFT</p>
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Transactions;
