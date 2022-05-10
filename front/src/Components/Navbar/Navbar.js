import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  window.ethereum.on("accountsChanged", () => {
    isWalletConnected();
  });

  const isWalletConnected = async () => {

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
    
    if (!window.ethereum) {
      alert("Intall Metamask Wallet");
    }
    let address = await window.ethereum.selectedAddress;
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    setWalletAddress(address ? address.toString() : "");
    localStorage.setItem("walletAddress", address);

    if (address) {
      const response = await axios.get(`http://localhost:8080/tokenBalanceOf`, {
        params: { address: address },
      });
  
      const balance = response.data.result /Math.pow(10, 18);
      setWalletBalance(balance);
    }
   
  }, [walletAddress]);

  return (
    <>
      <div className="navbar">
        <p className="heading">NFT Marketplace</p>
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
              <button>
                {walletBalance}{" "}
              </button>
            </>
          ) : (
            <button type="button" onClick={connectWalletHandler}>
              <p>Connect Wallet</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
