const Booking = require("../models/Booking");

const addBooking = async (req, res) => {
  const { id } = req.user;
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
    user: id,
  });
  res.json(bookingDoc);
};

const getBookings = async (req, res) => {
  const { id } = req.user;
  res.json(await Booking.find({ user: id }).populate("place"));
};

module.exports = {
    addBooking,
    getBookings
}