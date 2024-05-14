const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require('./config.js')
const routeHandler = require("./routes/userRoutes.js")

const app = express();
//to access .env file
dotenv.config();
app.use(bodyParser.json());
//app.use(express.json());
app.use(cors());

//import port number from .env file
const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Running the server port at http://localhost:${port}`);
})

app.use("/api", routeHandler);