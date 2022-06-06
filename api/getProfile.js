const User = require("./model/registerModel");

const getProfile =  (req,res) =>{


  User.find({}, (error, result)=>{
    if(!error){
      res.status(200).json(result)
      return;
    }
    else{
      res.status(500).json(error);
    }
  })

}

module.exports = getProfile;