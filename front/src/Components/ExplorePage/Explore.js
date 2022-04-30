import React from "react";
import "./explore.css";
import video from "../.././Assets/sample.mp4";
import { Link } from "react-router-dom";
import { pink } from "@material-ui/core/colors";
import { fontWeight } from "@mui/system";
const Explore = () => {

  let arr = [1,2,4,5,6,5,6,7,8, 7,8];

  return (
    <>
      <ul> <li><h1>Explore</h1></li></ul>

     <div className="container">
     {
        arr.map(()=>{
          return(
            <div className="card"> 
            <video src={video} />   
            <Link to="/details">
               
               <div className="cardDetails">
               <img src="https://picsum.photos/50/50" />
                <h4>Tenz</h4>
                <p>Price: <span style={{color: "orangered" , fontWeight: "bold"}}>20 Tokens</span></p>
               </div>
              <p> lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum
              </p>
              </Link>
            </div>
          );
        })
      }
     </div>
    </>
  );
};

export default Explore;
