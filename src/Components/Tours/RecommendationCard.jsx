import React from 'react'
import "./Tours.css"
import { useNavigate } from 'react-router-dom'

const TourCard = ({ tour}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/details', { state: { tour } });
    }

    return (
        <div className='outer-card-container'>
            <div className="inner-card-container">
                <img src={tour.img} alt="" />
                <h4>{tour.name}</h4>
                <p><i className='bx bx-current-location'></i>{tour.country}</p>
                <div className="card-price">
                    <p>₹ {tour.price} (<span className='days'>{tour.duration}</span>)</p>
                </div>
                <p className='mini-details'>{tour.shortDescription}</p>
                <button className="card-button" onClick={handleClick}>Details</button>
            </div>
        </div>
    )
}

export default TourCard