import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingInfo from '../components/BookingInfo';

const BookingPage = () => {

    const {id} = useParams();
    const [booking, setBooking] = useState('')

    useEffect(() => {
        if (id) {
            axios.get('/api/book/bookings').then(response => {
              const foundBooking = response.data.find(({_id}) => _id === id )
              if (foundBooking) {
                setBooking(foundBooking);
              }
            })
        }
    }, [id])


    if (!booking) {
        return '';
    }
  return (
    <div className='my-8'>
        <h1 className="text-3xl">{booking.place?.title}</h1>
        <AddressLink place={booking.place}/>
        <div className='bg-gray-200 p-4 mb-6 rounded-2xl '>
        <h2 className='text-xl mb-2'>Your booking information</h2>
        <BookingInfo booking={booking} />
        </div>
        <PlaceGallery place={booking.place} />
        
    </div>
  )
}

export default BookingPage
