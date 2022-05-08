import React from "react";
import "./explore.css";
import { Link } from "react-router-dom";
import { useState } from "react";


const Explore = () => {

  let arr = [1,2,4,5,6,5,6,7,8, 7,8];

  // const [showModal, setShowModal] = useState(false);
  // const [modalId,setModalId]=useState(null);

  // const setModal=(id)=>{
  //   console.log("modal",showModal);
  //   console.log('ids ',id);
  //   setModalId(id);
  //   setShowModal(true); 
  // }

  return (
    <>
      <ul style={{paddingLeft: "120px", marginTop:"50px", textDecoration:"none"}}> <li><h1>Explore</h1></li></ul>

     <div id="containerStyle" >
     {
        arr.map((value)=>{
          return(
            <div className="card"> 
             <Link to="/details">
            <video src="https://gateway.pinata.cloud/ipfs/QmTv2Tx9XQeLrvg8rs9LCCih6FrHt2mXs3LVBt23ZD7eE7" className="vid" style={{width: "268px"}} />   
    
           
               
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
