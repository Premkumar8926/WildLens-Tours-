import React from 'react'

const UserBookingCard = ({booking}) => {
    return (
        <>
            <div className="user-details">
                <div className="detail-item">
                    <span className="label">Travel to:</span>
                    <span className="value">{booking.bookingDetails.travelTo}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Number of passengers:</span>
                    <span className="value">{booking.bookingDetails.passengersCount}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Number of days:</span>
                    <span className="value">{booking.bookingDetails.daysCount}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Start date:</span>
                    <span className="value">{booking.bookingDetails.startDate}</span>
                </div>
                <div className="detail-item">
                    <span className="label">End date:</span>
                    <span className="value">{booking.bookingDetails.endDate}</span>
                </div>
            </div>


        </>
    )
}

export default UserBookingCard