const mongoose = require("mongoose");

// Create Schema
const userSchema = new mongoose.Schema({
    fName: {
        type:String,
        //required: true
    },
    lName: {
        type:String,
        //required: true
    },
    email: {
        type:String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },
});

//create model
const userModel = new mongoose.model("userInfo",userSchema);

module.exports = userModel;

