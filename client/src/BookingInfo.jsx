import React, { useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";

const BookingInfo = ({ booking }) => {
  const [bookings, setBookings] = useState([]);
  return (
    <div className="relative">
      <div className=" flex gap-2 border-t border-gray-300 mt-2 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
        {format(new Date(booking.checkIn), "dd-MM-yyyy")} &rarr;{" "}
        {format(new Date(booking.checkOut), "dd-MM-yyyy")}
      </div>
      <div className="flex gap-2 mb-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
        <div>
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          )}{" "}
          nights
        </div>
      </div>
      <div className="flex relative ">
        <div className="bg-primary p-3 text-white rounded-xl">
          Total price : $
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          ) * booking.place.price}
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
