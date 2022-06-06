const User = require("./model/registerModel");

const getProfileInfo =  (req,res) =>{

    console.log(req.query);

    const _address = req.query.address || "";
    if ([_address].includes("")) {
        res.status(404).json({
            error: "one of the required fields were left empty",
        });
        return;
    }

  User.find({address: _address}, (error, result)=>{
    if(!error){
      res.status(200).json(result)
      return;
    }
    else{
      res.status(500).json(error);
    }
  })

}

module.exports = getProfileInfo;