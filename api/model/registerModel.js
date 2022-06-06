const mongoose= require("mongoose");

var registerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:"Required"
    },
    address:{
        type: String,
    },
    profileImg:{
        type:String, 
    }
});

const User = mongoose.model("register",registerSchema);

module.exports =  User;