import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [isScroll, setIsScroll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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

    const login = () => {
        navigate("/login");
    }

    return (
        <>
            <div className="mobile-navbar-list">
            
                <ul>
                    <li><a href="#" className='white'>Home</a></li>
                    <li><a href="#about" className='white'>About</a></li>
                    <li><a href="#contact" className='white'>Contact</a></li>
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
                        <div className="login-signUp-buttons">
                            <button className='login-button' onClick={login}>Login</button>
                            <button className='signup-button' onClick={signUp}>Signup</button>
                        </div>
                    </div>
                    <div className="mobile-navbar">
                        <i className='bx bx-menu menu'></i>
                        <div className="login-signUp-buttons">
                            <button className='login-button' onClick={login}>Login</button>
                            <button className='signup-button' onClick={signUp}>Signup</button>
                        </div>
                    </div>
                </nav>
            </header>
            
        </>
    )
}

export default Header