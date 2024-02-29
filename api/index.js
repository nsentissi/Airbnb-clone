require("dotenv").config();
require("./db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const userRouter = require("./routes/user");
const placeRouter = require("./routes/place");
const bookingRouter = require("./routes/booking.js");

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

app.use("/api/auth", userRouter);
app.use("/api/rentals", placeRouter);
app.use("/api/book", bookingRouter);

app.listen(3000);
