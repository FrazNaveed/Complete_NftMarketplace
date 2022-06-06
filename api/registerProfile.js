const User = require("./model/registerModel");

const register = (req, res) => {

  const _name = req.body.name || "";
  const _address = req.body.address || "";
  const _image = req.body.image || "";

  if ([_name, _address, _image].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }

  try {

    const newUser = new User({
        name: _name,
        address: _address,
        profileImg: _image
    });

    newUser.save();
    return res.status(200).json({ msg: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};
module.exports = register;
