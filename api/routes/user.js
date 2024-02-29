const express = require("express");
const { register, login, getProfile, logout } = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken")
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login" ,login );
userRouter.post("/logout", verifyToken ,logout )
userRouter.get("/profile", verifyToken ,getProfile)

module.exports = userRouter;