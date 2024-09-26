import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Layouts/Footer';
import user_profile from "../../assets/user_profile.jpg"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { setUserDetails } from '../../Slices/AuthSlice';


const UserProfile = () => {
    const navigate = useNavigate();

    const { login, token, userDetails } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [activeLink, SetActivelink] = useState(true);

    const isObject = (value) => {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
    })
    
    return (
        <>
            {
                (!(login && userDetails && isObject(userDetails.user))) ? (
                    <div className="loading-container bg-white">
                        <ReactLoading type="spinningBubbles" color="#3F775A" />
                    </div>
                ) :
                    (
                        <>
                            <div className='header'>
                                <div className="container inner-header">
                                    <div className="logo">
                                        <h1 className='d-flex align-items-center'><i className='bx bxs-leaf mx-2'></i>WildLens Tours</h1>
                                    </div>
                                    <button className='return-btn' onClick={() => navigate("/")}><i className='bx bxs-chevrons-left' ></i>Home</button>
                                </div>
                            </div>


                            <div className="user-profile container">
                                <div className="user_profile-img">
                                    <img src={user_profile} alt="" />
                                </div>
                                <div className="user_profile_content">
                                    <h2 className='text-center'>{userDetails.user.firstName} {userDetails.user.lastName}</h2>
                                    <h3 className='text-center'>{userDetails.user.email}</h3>
                                </div>
                                <div className="border"></div>
                                <div className="bookings_list">
                                    <ul className='mb-3'>
                                        <li>
                                            <NavLink to="previousbookings"
                                                className={activeLink ? "active" : ""}
                                            >
                                                Previous Bookings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="upcomingbookings"
                                                className={({ isActive }) => {

                                                    if (isActive) {
                                                        SetActivelink(false);
                                                    }
                                                    return isActive ? 'active' : ''
                                                }}
                                                onClick={() => SetActivelink(false)}
                                            >
                                                Upcoming Bookings
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <Outlet />
                                </div>

                            </div>

                            <Footer />
                        </>
                    )
            }

        </>
    )
}

export default UserProfile