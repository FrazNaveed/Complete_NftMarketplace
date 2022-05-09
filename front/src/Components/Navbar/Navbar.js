import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  console.log("Checking",walletAddress);

  window.ethereum.on("accountsChanged", () => {
    isWalletConnected();
  });

  const isWalletConnected = () => {
    if (!window.ethereum) {
      alert("Install Metamask");
    }
    let address = window.ethereum.selectedAddress;
    localStorage.setItem("walletAddress", address);
   
    setWalletAddress(address ? address.toString() : "");
  };


  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Install metamask");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    const addr = localStorage.getItem("walletAddress");
    {addr && setWalletAddress(addr) }
    isWalletConnected();
  }, [walletAddress]);

  return (
    <>
      <div className="navbar">
        <h2>NFT Marketplace</h2>
        <nav>
          <ul className="items">
            <li>
              <NavLink to="/" activeClassName="active">
                {" "}
                Explore{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/popular" activeClassName="active">
                {" "}
                Popular{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/sale" activeClassName="active">
                {" "}
                Sale{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/collection" activeClassName="active">
                {" "}
                My Collection{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/creators" activeClassName="active">
                {" "}
                Creators{" "}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="buttons">
          {walletAddress ? (
            <>
              {" "}
              <NavLink to="/create">
                <button>
                  <span>Create</span>
                </button>
              </NavLink>
              <button>200 Tokens</button>
            </>
          ) : (
            <button type="button"  onClick={connectWalletHandler}>
              <p>Connect Wallet</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
