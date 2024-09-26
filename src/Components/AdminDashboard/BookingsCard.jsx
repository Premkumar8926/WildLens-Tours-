import React from 'react';

const BookingsCard = () => {
    return (
        <>
            <div className="user-details">
                <div className="detail-item">
                    <span className="label">Customer name:</span>
                    <span className="value">Prem Kumar D</span>
                </div>
                <div className="detail-item">
                    <span className="label">Email Id:</span>
                    <span className="value">07pkumaran1996@gmail.com</span>
                </div>
                <div className="detail-item">
                    <span className="label">Travel to:</span>
                    <span className="value">Ranthambore national park</span>
                </div>
                <div className="detail-item">
                    <span className="label">Number of passengers:</span>
                    <span className="value">5</span>
                </div>
                <div className="detail-item">
                    <span className="label">Number of days:</span>
                    <span className="value">7 days</span>
                </div>
            </div>
        </>

    );
};

export default BookingsCard;
