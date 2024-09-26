import React from 'react'
import "./Sections.css"
import video from "../../assets/bg-video.mp4"
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recommendation from './Recommendation';
import About from './About';
import Contact from './Contact';
import Footer from '../Layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../Slices/AuthSlice';

const Home = () => {

    const { login, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const [isScroll, setIsScroll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
        const handleClick = (event) => {
            aNodeList.forEach(a => a.classList.remove("onfocus-design"));
            event.currentTarget.classList.add("onfocus-design");
        }

        const handleMenuClick = () => {
            const menuClass = document.querySelector(".mobile-navbar-list");
            menuClass.classList.add("left");
        }

        const handleCloseClick = () => {
            const menuClass = document.querySelector(".mobile-navbar-list");
            menuClass.classList.remove("left");
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScroll(true);
            }
            else {
                setIsScroll(false);
            }
        }

        const handleNavclick = () => {
            const menuClass = document.querySelector(".mobile-navbar-list");
            menuClass.classList.remove("left");
        }

        window.addEventListener("scroll", handleScroll);

        const menuIcon = document.querySelector(".menu");
        menuIcon.addEventListener("click", handleMenuClick);

        const closeIcon = document.querySelector(".close-icon");
        closeIcon.addEventListener("click", handleCloseClick);

        const aNodeList = document.querySelectorAll(".navbar ul li a");
        aNodeList.forEach(a => {
            a.addEventListener("click", handleClick)
        });

        const aNodeListMobile = document.querySelectorAll(".mobile-navbar-list ul li a");
        aNodeListMobile.forEach(a => {
            a.addEventListener("click", handleNavclick)
        });

        return () => {
            aNodeList.forEach(a => {
                a.removeEventListener("click", handleClick);
            })
            menuIcon.removeEventListener("click", handleMenuClick);

            window.removeEventListener("scroll", handleScroll);

            aNodeListMobile.forEach(a => {
                a.removeEventListener("click", handleNavclick)
            });
        }

    }, [])

    const signUp = () => {
        navigate("/signup");
    }

    const handleLogin = () => {
        navigate("/login");
    }
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setLogin(false));
    }

    const handleMyProfile = () => {
        navigate("/myprofile");
    }
    return (
        <>
            <div className="mobile-navbar-list">

                <ul>
                    <li><a href="#" className='green'>Home</a></li>
                    <li><a href="#about" className='green'>About</a></li>
                    <li><a href="#contact" className='green'>Contact</a></li>
                </ul>
                <i className='bx bx-x close-icon'></i>

            </div>

            <header className={isScroll ? "scrolled" : ""}>
                <nav>
                    <div className="navbar">
                        <div className="logo">
                            <h1 className='d-flex align-items-center'><i className='bx bxs-leaf mx-2'></i>WildLens Tours</h1>
                        </div>
                        <ul>
                            <li><a href="#" className='onfocus-design white'>Home</a></li>
                            <li><a href="#about" className='white'>About</a></li>
                            <li><a href="#contact" className='white'>Contact</a></li>
                        </ul>
                        {
                            !login
                                ?
                                <div className="login-signUp-buttons">
                                    <button className='login-button' onClick={handleLogin}>Login</button>
                                    <button className='signup-button' onClick={signUp}>Signup</button>
                                </div>
                                :
                                <div className="login-signUp-buttons">
                                    <button className='login-button' onClick={handleLogout}>Logout</button>
                                    <button className='signup-button' onClick={handleMyProfile}>My Profile</button>
                                </div>
                        }
                    </div>
                    <div className="mobile-navbar">
                        <i className='bx bx-menu menu'></i>
                        {
                            !login
                                ?
                                <div className="login-signUp-buttons">
                                    <button className='login-button' onClick={handleLogin}>Login</button>
                                    <button className='signup-button' onClick={signUp}>Signup</button>
                                </div>
                                :
                                <div className="login-signUp-buttons">
                                    <button className='login-button' onClick={handleLogout}>Logout</button>
                                    <button className='signup-button' onClick={handleMyProfile}>My Profile</button>
                                </div>
                        }
                    </div>
                </nav>
            </header>

            <div className="welcome_video">
                <div className="mobile-logo">
                    <h1 className='d-flex align-items-center'><i className='bx bxs-leaf mx-2'></i>WildLens Tours</h1>
                </div>
                <video autoPlay muted loop id="background-video">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className='intro-details container'>
                    <h1 className='home-title'>Experience the thrill of wildlife with our expert-led tours</h1>
                    <button className='action-btn' onClick={() => navigate("/alltours")}>Start Exploring</button>
                </div>
                <div className="overlay"></div>
            </div>
            <About />
            <Recommendation />
            <Contact />
            <Footer />
        </>
    )
}

export default Home