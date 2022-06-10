import { React, useEffect, useState } from "react";
import axios from "axios";
import "./creators.css";

const Creators = () => {
  var ids = [];
  const [profilesData, setProfileData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getProfile`);

    for (let i = 0; i < res.data.length; i++) {
      ids.push({
        name: res.data[i].name,
        address:
          res.data[i].address.substr(0, 6) +
          "..." +
          res.data[i].address.substr(37),
        image: res.data[i].profileImg,
      });
    }
    setProfileData(ids);
    console.log(res);
  }, []);

  return (
    <div className="mainDiv">
      <h1>Creators</h1>

      <div className=" populateDiv">
        {profilesData.map((value) => {
          return (
            <>
              <div className="creatorCards">
                <img src={`${value.image}`} alt="profile image" />

                <div className="creatorInfo">
                  <h3>Name: {value.name}</h3>
                  <h4>Address: {value.address}</h4>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Creators;
