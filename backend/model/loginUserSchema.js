const mongoose = require("mongoose");

// Create Schema
const loginSchema = new mongoose.Schema({
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
const LoginModel = new mongoose.model("loginInfo",loginSchema);

module.exports = LoginModel;

