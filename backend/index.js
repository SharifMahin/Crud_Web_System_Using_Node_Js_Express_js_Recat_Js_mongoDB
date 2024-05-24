const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require('./config.js');
const routeHandler = require("./routes/userRoutes.js");
const cookieP = require('cookie-parser')

const app = express();
dotenv.config(); //to access .env file
app.use(cookieP()); // Middleware to parse cookies
app.use(express.json());

// CORS configuration to allow cookies
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'] 
  }));


const port = process.env.PORT;  //import port number from .env file

app.listen(port,()=>{
    console.log(`Running the server port at http://localhost:${port}`);
})

app.use("/api", routeHandler);