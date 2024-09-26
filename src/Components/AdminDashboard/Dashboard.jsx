import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../Slices/AuthSlice';
import ReactLoading from 'react-loading';
const Dashboard = () => {

    const [activeLink, SetActivelink] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { datas, isLoading } = useSelector(state => state.dashboard);
    
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setLogin(false));
        navigate("/")
    }

    return (
        <>
            <div class="dashboard">

                {isLoading && (
                    <div className="loading-container">
                        <ReactLoading type="spinningBubbles" color="#3F775A" />
                    </div>
                )}
                <div className="topbar">
                    <div className="container inner-header">
                        <div className="logo">
                            <h1 className='d-flex align-items-center'><i className='bx bxs-leaf mx-2'></i>WildLens Tours</h1>
                        </div>
                        <button className='return-btn' onClick={handleLogout}><i className='bx bxs-chevrons-left' ></i>Logout</button>
                    </div>
                </div>

                <div class="sidebar">
                    <ul>
                        <li>
                            <NavLink to="home"
                                className={activeLink ? "active" : ""}
                            >
                                <i className='bx bxs-home' ></i>
                                <div>Home</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="users"
                                className={({ isActive }) => {

                                    if (isActive) {
                                        SetActivelink(false);
                                    }
                                    return isActive ? 'active' : ''
                                }}
                            >
                                <i className='bx bxs-user'></i>
                                <div>Users</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="marketing"
                                className={({ isActive }) => {

                                    if (isActive) {
                                        SetActivelink(false);
                                    }
                                    return isActive ? 'active' : ''
                                }}
                            >
                                <i className='bx bxs-envelope' ></i>
                                <div>Marketing</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="tours"
                                className={({ isActive }) => {

                                    if (isActive) {
                                        SetActivelink(false);
                                    }
                                    return isActive ? 'active' : ''
                                }}
                            >
                                <i className='bx bxs-plane-alt' ></i>
                                <div>Tours</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="bookings"
                                className={({ isActive }) => {

                                    if (isActive) {
                                        SetActivelink(false);
                                    }
                                    return isActive ? 'active' : ''
                                }}
                            >
                                <i className='bx bxs-book-alt'></i>
                                <div>Bookings</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="messages"
                                className={({ isActive }) => {

                                    if (isActive) {
                                        SetActivelink(false);
                                    }
                                    return isActive ? 'active' : ''
                                }}
                            >
                                <i className='bx bxs-message-dots' ></i>
                                <div>Messages</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <Outlet />
            </div>

        </>
    )
}

export default Dashboard