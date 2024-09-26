import React from 'react'
import UserBookingCard from './UserBookingCard';
import { useSelector } from 'react-redux';

const PreviousBookings = () => {
  const { login, token, userDetails } = useSelector(state => state.auth);
  const previousBookings = userDetails.bookings.filter(booking => (
    booking.status == "completed"
  ))
  return (
    <>
      <div className="previous_bookings_container container">
        <div className={previousBookings.length > 0 ? "booking-cards mb-3" : "booking-cards mb-3  d-flex justify-content-center" }>
          {
            previousBookings.length > 0 ? previousBookings.map(booking => (
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

export default PreviousBookings