const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require('./config.js');
const routeHandler = require("./routes/userRoutes.js");
const cookieP = require('cookie-parser')

const app = express();
//to access .env file
dotenv.config();
app.use(cookieP()); // Middleware to parse cookies
app.use(bodyParser.json());
app.use(express.json());

// CORS configuration to allow cookies
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'] 
  }));

//import port number from .env file
const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Running the server port at http://localhost:${port}`);
})

app.use("/api", routeHandler);