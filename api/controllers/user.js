const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

const bcryptSalt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
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
};

const login = async (req, res) => {
  console.log("Received Login Request");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const passOK = bcrypt.compareSync(password, user.password);
    if (!passOK) {
      return res.status(422).json("Wrong password");
    }

    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.error("Error Generating JWT:", err);
          return res.status(500).json({ message: "Error generating token" });
        }
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ success: true });
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { name, email, _id } = req.user;
    res.json({ name, email, _id });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = {
  register,
  login,
  getProfile,
  logout,
};
