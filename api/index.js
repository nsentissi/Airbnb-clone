const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require ('jsonwebtoken')
const User = require("./models/User.js");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'nkjnkj433kljdfewj53khnl'

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (user) {
    const passOK = bcrypt.compareSync(password, user.password)
    if(passOK) {
        jwt.sign({email: user.email, id:user._id}, jwtSecret, {}, (err,token)=> {
            if (err) throw err;
            res.cookie('token', token).json(user)
        })
    } else {
       return res.status(422).json('Wrong password')
        
    }
  } else if (!user) {
    return res.status(404).json('User not found');
  }
});

app.listen(3000);
