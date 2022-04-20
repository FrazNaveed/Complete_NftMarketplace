import {React, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {

  const [walletAddress, setWalletAddress] = useState("");


  const isWalletConnected = () => {
    if (!window.ethereum) {
      return;
    }
    let address = window.ethereum.selectedAddress;
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
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


  useEffect(async ()=>{


    if (!window.ethereum) {

      connectWalletHandler()      // window.ethereum.on("accountsChanged", accountsChanged);
     }
     else{
    
     }
     

  },[]);

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
          <NavLink to="/create">
              <button><span>Create</span></button>
            </NavLink>
          <button>200 Tokens</button>
          </div>
     </div>
    </>
  );
};

export default Navbar;
