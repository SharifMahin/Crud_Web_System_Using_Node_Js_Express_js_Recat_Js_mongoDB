
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.URI;


// //direct call 
// const connect = mongoose.connect(uri);
// connect.then(() => {
//     console.log("MongoDB Connection Successful");
// })
// .catch((err) => {
//     console.log("er");
// });

// module.exports = connect;


const connection = async () => {
    try{
        await mongoose.connect(uri);
        console.log("MongoDB Connection Successful");
    } catch(err){
    console.log(err);
        };
    }
connection(); // call the async function
module.exports = connection;