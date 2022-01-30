import React from 'react'
import Fox from './MetaMask_Fox.svg.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./front.css";

const Front = () => {
    return (
       <>
       <div className="header">
           <h3>NFT Marketplace</h3>
            <hr/>
        </div>

        <div className="MainDiv">
        <p>Connect the Wallet </p>
        <div className="WalletCard">
            <div className="WalletUp">
             <img src={Fox} alt="Fox" />
            </div>

            <div className="WalletDown">
            {/* Change to Link Tag with React Router when implementing the functionality */}
            <button>Connect</button>

            </div>
        </div>
        </div>
        
       <div className="footer">
          <div className="footer-inner">
          <MailOutlineIcon/>
           <GitHubIcon/>
        <p>Developed By: Fraz Naveed</p>
          </div>
       </div>
       </>
    )
}
export default Front
