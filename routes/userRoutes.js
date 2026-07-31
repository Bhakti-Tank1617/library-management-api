 const express = require("express");

 const {
    createUser, 
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware")

const authorize = require("../middleware/roleMiddleware");

 const router = express.Router();

 router.post("/" , createUser);
 router.post("/login",loginUser)

 router.get("/" ,protect, getAllUsers)
 router.get("/:id",getUserById)

 router.put("/:id",updateUser);
 
 router.delete("/:id" , protect,authorize("admin"), deleteUser);
 
 module.exports = router;
