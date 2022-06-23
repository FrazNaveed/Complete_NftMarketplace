import { React, useEffect, useState } from "react";
import axios from "axios";
import Spinner from ".././Spinner/Spinner";
import "./creators.css";

const Creators = () => {
  var ids = [];
  const [profilesData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  return (
    <div className="mainDiv">
      <div className="heading">
        <h1>Creators</h1>
      </div>

      <div className=" populateDiv">
        {isLoading ? (
          <Spinner />
        ) : (
          profilesData.map((value) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default Creators;
