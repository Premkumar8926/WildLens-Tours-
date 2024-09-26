import React from 'react'
import UserBookingCard from './UserBookingCard'
import { useSelector } from 'react-redux';

const UpcomingBookings = () => {

  const { login, token, userDetails } = useSelector(state => state.auth);
  const upcomingBookings = userDetails.bookings.filter(booking => (
    booking.status == "pending"
  ))

  return (
    <>
      <div className="upcoming_bookings_container container">
        <div className={upcomingBookings.length > 0 ? "booking-cards mb-3" : "booking-cards mb-3  d-flex justify-content-center" }>
          {
            upcomingBookings.length > 0 ?
            upcomingBookings.map(booking => (
              <UserBookingCard booking={booking} /> 
            ))
              :
              <h3>Zero Bookings</h3>
          }
        </div>
      </div>
    </>
  )
}

export default UpcomingBookings