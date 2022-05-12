import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./history.css";

const History = () => {
  let { tokenId } = useParams();

  const [transactions, setTransactions] = useState([]);

  const history = [];

  useEffect(async () => {
    const response = await axios.get(`http://localhost:8080/getNftHistory`, {});

    for (var i = 0; i < response.data.result.length; i++) {
      if (response.data.result[i].returnValues.tokenId == tokenId.toString()) {
        history.push({
          from: response.data.result[i].returnValues.from.toLowerCase(),
          to: response.data.result[i].returnValues.to.toLowerCase(),
          price: response.data.result[i].returnValues.tokenPrice,
          date: response.data.result[i].returnValues.timestamp,
      });
      }
    }
    setTransactions(history);
  }, []);

  return (
    <div className="historySection">
      <table>
        <thead className="tHeader">
          <tr>
            <td className="tableCell">FROM</td>
            <td className="tableCell">TO</td>
            <td className="tableCell">PRICE</td>
            <td className="tableCell">DATE</td>
          </tr>
        </thead>

        {transactions.map((values) => {
          return (
            <tbody>
              <tr>
                <td className="tableCell">
                  {values.from}
                </td>
                <td className="tableCell">{values.to}</td>
                <td className="tableCell">
                  {" "}
                  {values.price /
                    Math.pow(10, 18)}{" "}
                  TOKENS
                </td>
                <td className="tableCell">
                  {" "}
                  {values.date}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default History;
