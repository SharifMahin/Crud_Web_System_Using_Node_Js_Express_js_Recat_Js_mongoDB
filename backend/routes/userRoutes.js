const express = require("express");
const router = express.Router();
const {create,fetchAllUser,fetchUser,updateUser,deleteUser} = require("../controller/userController.js");

router.post("/create", create);
router.get("/findAll",fetchAllUser);
router.get("/findOne/:id",fetchUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);

module.exports = router;