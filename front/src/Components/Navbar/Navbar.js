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
    const { ethereum } = window;
    if (!ethereum) {
      alert("Intall Metamask Wallet");
    }

    const address = await window.ethereum.request({ method: "eth_accounts" });
    setWalletAddress(address[0]);
    localStorage.setItem("Address", address[0]);

    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
      const address = await window.ethereum.request({ method: "eth_accounts" });
      setWalletAddress(address[0]);
      localStorage.setItem("Address", address[0]);
    });

    if (walletAddress) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tokenBalanceOf`,
        {
          params: { address: walletAddress },
        }
      );

      const balance = response.data.result / Math.pow(10, 18);
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
              <NavLink to="/sale" activeClassName="active">
                {" "}
                Sale{" "}
              </NavLink>
            </li>

            <li>
              <NavLink to="/collection" activeClassName="active">
                {" "}
                My Collections{" "}
              </NavLink>
            </li>

            {/* <li>
              <NavLink to="/transactions" activeClassName="active">
                {" "}
                Transactions{" "}
              </NavLink>
            </li> */}

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
              <button>{walletBalance} </button>
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
