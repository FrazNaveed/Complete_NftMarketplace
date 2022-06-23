import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
       <div className="protectionBadge">
        <a
          href="https://www.dmca.com/Protection/Status.aspx?ID=58cd72c6-f6d7-480e-811a-c605babcacbf&refurl=https://frontend-lkbk04498-fraznaveed.vercel.app/"
          title="DMCA.com Protection Status"
          class="dmca-badge"
        >
          {" "}
          <img
            src="https://images.dmca.com/Badges/dmca_protected_sml_120l.png?ID=58cd72c6-f6d7-480e-811a-c605babcacbf"
            alt="DMCA.com Protection Status"
          />
        </a>{" "}
        <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js">
          {" "}
        </script>
      </div>
      <div className="footer-inner">
        <a href="mailto:01-134181-021@student.bahria.edu.pk" target="_blank">
          {" "}
          <MailOutlineIcon />
        </a>
        <a
          href="https://github.com/FrazNaveed/FYP_NftMarketplace"
          target="_blank"
        >
          {" "}
          <GitHubIcon />
        </a>
        <p>Developed By: Fraz Naveed</p>
      </div>
     
    </div>
  );
};

export default Footer;
