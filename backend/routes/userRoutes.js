const express = require("express");
const router = express.Router();
const {fetchAllUser,fetchUser,updateUser,deleteUser, create, Loginfo} = require("../controller/userController.js");
const checkLogin = require("../checkLoginMiddleware/checkLogin.js");

router.post("/login", Loginfo)
router.post("/create", create);
router.get("/findAll",fetchAllUser);
router.get("/findOne/:id",fetchUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);

module.exports = router;