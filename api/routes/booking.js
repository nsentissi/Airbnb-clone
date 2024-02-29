const express = require("express");
const {addBooking, getBookings} = require("../controllers/booking");
const bookingRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");



bookingRouter.post("/bookings", verifyToken, addBooking );
bookingRouter.get("/bookings", verifyToken, getBookings );



module.exports = bookingRouter;