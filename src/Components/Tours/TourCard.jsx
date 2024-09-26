import React from 'react'
import "./Tours.css"
import { useNavigate } from 'react-router-dom'
import { setCurrentTourId } from '../../Slices/TourSlice';
import { useDispatch, useSelector } from 'react-redux';

const TourCard = ({tour}) => {
    const navigate = useNavigate();
    const { tours, currentTourId } = useSelector(state => state.tour);
    const dispatch = useDispatch();

    const handleClick = () => {
        const tourId = tour._id;
        window.localStorage.setItem("currentTourId", tourId);
        const tourIdFromLocalStorage = window.localStorage.getItem("currentTourId");
        dispatch(setCurrentTourId(tourIdFromLocalStorage));
        navigate('/details');
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