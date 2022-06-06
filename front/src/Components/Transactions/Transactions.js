import React, { useState } from "react";
import "./transactions.css";

const Transactions = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div className="transactionsDiv">
      <div className="findBetweenDates">
       <center> <h2>Select Dates to find transactions</h2></center>
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
      <button className="findButton">Find</button>



    </div>
  );
};

export default Transactions;
