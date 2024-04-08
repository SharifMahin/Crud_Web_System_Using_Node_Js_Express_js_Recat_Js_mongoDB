const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/crud");
connect.then(() => {
    console.log("MongoDB Connection Successful");
})
.catch((err) => {
    console.log(err);
});

module.exports = connect;