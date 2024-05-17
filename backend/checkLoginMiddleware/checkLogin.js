const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const { email, country } = decoded;
        req.email = email;
        req.country = country;
        next(); //call the next middleware
    }
    catch{
       // next("Authentication Failed");
       res.send("Authentication Error");
    }
}

module.exports = checkLogin;