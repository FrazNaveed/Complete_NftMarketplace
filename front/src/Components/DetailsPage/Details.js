import React from "react";
import "./details.css";
import video from "../.././Assets/sample.mp4";
import axios from "axios";

const Details = (props) => {

  // console.log('modal render');
  // console.log(props.modalId);

  // useEffect(async()=>{

  //   const uri = await axios.get(
  //      `http://localhost:3000/mintNFT/getTokenURI`,
  //     {
  //         params: { tokenId: id },
  //     }
  // );

  // })




  return (
    <div className="container">
            {/* <button onClick={()=>props.setShowModal(false)}>
        X
      </button> */}
      <div className="vidSection">
        <video className="video" src={video} autoPlay muted loop />
      </div>

      <div className="nameNdPrice">
        <div className="name">
          <img src="https://picsum.photos/50/50" />
          <h2>Tenz</h2>
        </div>

        <div className="price">
          <h3>Price:</h3>
          <p>
            20{" "}
            <span style={{ color: "orangered", marginRight: "15px" }}>
              Tokens
            </span>
          </p>
        </div>
      </div>

      <div className="detailNdButton">
        <div className="details">
          <h1>Getting An ACE:</h1>
          <p>
            {" "}
            lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum
            dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit
            amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem
            ipsum dolor sit amet, lorem ipsum dolor sit amet,
          </p>
        </div>

        <div className="button">
          <button>Make Offer</button>
        </div>
      </div>

      <div className="header">
        <h2>Item History:</h2>
      </div>

      <div className="historySection">
        <table>
          <thead className="tHeader">
            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">FROM</td>
              <td className="tableCell">TO</td>
              <td className="tableCell">PRICE</td>
              <td className="tableCell">DATE</td>
            </tr>
          </thead>

          <tbody>
          <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>

            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>


            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>
            
            <tr>
              <td className="tableCell">Event</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</td>
              <td className="tableCell">20 TOKENS</td>
              <td className="tableCell">DATE</td>
            </tr>
            
          </tbody>
        </table>
      </div>

      {/* <div className="historySection">

        <div className="headings">
          <h4>EVENT</h4>
          <h4 >FROM</h4>
          <h4>TO</h4>
          <h4>PRICE</h4>
          <h4>DATE</h4>
        </div>

        <div className="transactions">
          <h5>EVENT</h5>
          <h5>0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</h5>
          <h5>0xbD9D4a71B76C494958d9D258A1e3d4c0801495e0</h5>
          <h5>20 Token</h5>
          <h5>DATE</h5>
        </div>
      </div> */}
    </div>
  );
};

export default Details;
