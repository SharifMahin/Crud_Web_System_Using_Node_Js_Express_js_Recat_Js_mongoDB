const userModel = require('../model/userSchema.js');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();
//Login User
const Loginfo = async (req,res) => {

    try{
        //check the data
        const check = await userModel.findOne({email:req.body.email});       
        if(!check){
            return res.status(200).json({message: "Invalid Email"});
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            //generate token
            const token = jwt.sign({
                email: check.email,
                country: check.country
            },process.env.JWT_SECRET_KEY,{
                expiresIn: '2h'
            });
            //console.log(token);
            return res.status(200).json({"message": "Login Succesfully"}); 
        }
        else{
            return res.status(401).json({message: "Password not match"});
        }
    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({message: "Authentication Failed"});
    }
}

//Create User data
const create = async (req, res) => {
    try{
        const { fName, lName, email, password, gender, country } = req.body;
        // Check if the email already exists
        const existEmailCheck = await userModel.findOne({email}); 
        if(existEmailCheck){
           return res.json({message: "This email already exist"});
         }
        else if(!fName || !lName || !email || !password || !gender || !country){
            return res.json({message: "Fill the Input field"});
        }else{
            const saltrounds = 10; 
            const hashedPassword = await bcrypt.hash(password, saltrounds); // Hash the password
            // Create a new user with the hashed password
            const userData = new userModel({
                fName,
                lName,
                email,
                password: hashedPassword, // Replace plain-text password with hashed password
                gender,
                country
            });            
            // Save the user data to the database
           const saveData = await userData.save();
           return res.json({message: "User Created Succesfully"});
        }
    }catch(error){
        return res.status(500).json({erroe: error});
    }   
}


//fetch All data
const fetchAllUser = async (req, res) => {
   try{
        const existData = await userModel.find();
        if(existData==''){
            return res.status(404).json({message: "No data available"});
        }else{
           return res.status(200).json(existData);
        }
    }catch(error){
       return res.status(500).json({error: "There was a server side error!"});
   }   
}

//fetch one data
const fetchUser = async (req, res) => {
    try{
        const retriveOne = await userModel.findById(req.params.id);
         if(retriveOne){
             //return res.status(404).json({message: "No data available"});
             return res.status(200).json(retriveOne);
          }else{
            return res.status(404).json({message: "User data not available"});
          }
     }catch(error){
        return res.status(502).json({error: "There was a server side error!"});
    }   
 }

//Update data
const updateUser = async (req, res) => {
    try{
        const existData = await userModel.findById(req.params.id);
        const userData = new userModel(req.body);
         if(!existData){
            return res.json({message: "User data not available"});
          }         
         else if(!userData.fName || !userData.lName || !userData.email || !userData.gender || !userData.country){
              return res.json({message: "Fill the Input field"});
          }
        else{
            const updatedData = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true}); //{new:true} store the updated value
            return res.json({message: "User Data Updated Successfully"});
        }
     }catch(error){
        return res.status(502).json({error: "There was a server side error!"});
    }   
 }

//Delete data
const deleteUser = async (req, res) => {
    try{
        const existData = await userModel.findById(req.params.id);
         if(!existData){
            return res.status(404).json({message: "User data not available"});
          }
        const deletedData = await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "User Deleted Successfully"});
     }catch(error){
        return res.status(502).json({error: "There was a server side error!"});
    }   
 }

module.exports = {Loginfo,create,fetchAllUser,fetchUser,updateUser,deleteUser};