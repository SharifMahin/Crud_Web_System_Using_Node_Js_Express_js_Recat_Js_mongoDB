const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const checkLogin = (req, res, next) => {
    try{
        const cookie = req.cookies.jwt;
        if (!cookie) {
            return res.status(401).json({ message: "Authentication Error: token is missing" });
        }
        const decoded = jwt.verify(cookie,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({ message: "Authentication Failed" });
        }
        const { email, country } = decoded;
        req.email = email;
        req.country = country;
        next(); //call the next middleware
    }
    catch{
       // next("Authentication Failed"); //same the below line
       res.status(401).json({ message: "Authentication Error: Invalid token" });
    }
}

module.exports = checkLogin;