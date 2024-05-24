const userModel = require('../model/userSchema.js');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();
//Login User
const Loginfo = async (req,res) => {

    try{
        //check the data by exist email with case insensitivity. $options: 'i' makes the regex case-insensitive.
        const check = await userModel.findOne({ email: { $regex: `^${req.body.email}$`, $options: 'i' } });       
        if(!check){
            return res.json({message: "Email not register"});
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            //generate token
            const token = jwt.sign({
                _id: check._id,
                email: check.email,
                country: check.country
            },process.env.JWT_SECRET_KEY,{
                expiresIn: '24h'
            });
             res.cookie('jwt',token,{ httpOnly: true , maxAge: 24 * 60 * 60 * 1000 });
             return res.json({"message": "Login Succesfully"}); 
        }
        else{
            return res.json({message: "Password not match"});
        }
    }catch(error){
        console.error("Login Error:", error);
        return res.json({message: "Authentication Failed"});
    }
}

//chexkauth
const auth = (req, res) => {
    res.status(200).json({ message: "User is authenticated" });
  };

// logout
const logout = async (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 0 });
      return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
      return res.status(502).json({ error: "There was a server-side error!" });
    }
  };

//Create User data
const create = async (req, res) => {
    try{
        const { fName, lName, email, password, gender, country } = req.body;
        // Check if the email already exists with case insensitivity. $options: 'i' makes the regex case-insensitive.
        const existEmailCheck = await userModel.findOne({ email: { $regex: `^${email}$`, $options: 'i' } }); 
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
           const saveData = await userData.save();   // Save the user data to the database
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
        if(existData.length === 0){
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

// Search Users
const searchUsers = async (req, res) => {
    try{
        const { key } = req.params;
        const searchQuery = {
            $or: [
                { fName: { $regex: `^${key}$`, $options: "i" } },  //exact match
                { lName: { $regex: `^${key}$`, $options: "i" } },  //exact match
                { email: { $regex: `^${key}$`, $options: "i" } }, //exact match
                { country: { $regex:`^${key}$`, $options: "i" } }, //partial match
                { gender: { $regex: `^${key}$`, $options: "i" } }  //exact match
                ]
            };

        const existData = await userModel.find(searchQuery);

        if(existData.length === 0){
            return res.status(404).json({message: "User data not available"});
        }
            return res.status(200).json({existData});
    }catch(error){
            return res.status(502).json({error: "There was a server side error!"});
    }   
 }

module.exports = {Loginfo,logout,create,fetchAllUser,fetchUser,updateUser,deleteUser,auth,searchUsers};