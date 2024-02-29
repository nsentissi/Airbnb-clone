require("dotenv").config();
require("./db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Booking = require("./models/Booking.js");

const path = require("path");



const userRouter = require("./routes/user")
const placeRouter = require("./routes/place")

const app = express();



app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", userRouter)
app.use("/api/rentals", placeRouter)



app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req)
  const { place, checkIn, checkOut, numberOfGuests, name, mobile, price } =
    req.body;
  const bookingDoc = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    mobile,
    price,
    user: userData.id
  });
  res.json(bookingDoc);
});



app.get("/bookings", async (req, res) => {
 const userData = await getUserDataFromReq(req);
 res.json( await Booking.find({user: userData.id}).populate('place'))
});

app.listen(3000);
