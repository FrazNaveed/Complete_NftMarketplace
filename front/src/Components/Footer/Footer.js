import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./footer.css";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-inner">
       <a href="mailto:01-134181-021@student.bahria.edu.pk" target="_blank" > <MailOutlineIcon /></a>
       <a href="https://github.com/FrazNaveed/FYP_NftMarketplace" target="_blank"> <GitHubIcon /></a>
        <p>Developed By: Fraz Naveed</p>
      </div>
    </div>
  );
} 

export default Footer;
