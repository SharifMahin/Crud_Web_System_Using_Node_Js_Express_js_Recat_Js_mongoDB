const express = require("express");
const router = express.Router();
const {fetchAllUser,fetchUser,updateUser,deleteUser, create, Loginfo,logout,auth,searchUsers} = require("../controller/userController.js");
const checkLogin = require("../checkLoginMiddleware/checkLogin.js");

router.post("/login", Loginfo)
router.post("/create",  create);
router.post("/logout",logout);
router.get("/findAll",checkLogin, fetchAllUser);
router.get("/findOne/:id",fetchUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);
router.get('/checkAuth', checkLogin,auth);
router.get('/search/:key', searchUsers);

module.exports = router;