import React from 'react'
import "./Layout.css"
import '../Sections/Sections.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="container inner-ft-container">
                <div className="brand-container">
                    <div className="logo">
                        <h1 className='d-flex align-items-center'><i className='bx bxs-leaf mx-2'></i>WildLens Tours</h1>
                    </div>
                    <div className="social-icons">
                        <i className='bx bxl-facebook' ></i>
                        <i className='bx bxl-twitter' ></i>
                        <i className='bx bxl-linkedin' ></i>
                    </div>
                </div>

                <div className="info-container custom-ft">
                    <h4 className='gree-secondary'>Information</h4>
                    <ul>
                        <li><Link to="/" className='green'>Home</Link></li>
                        <li><Link to="/#about" className='green'>About</Link></li>
                        <li><Link to="/alltours" className='green'>Explore</Link></li>
                        <li><Link to="/#contact" className='green'>Contact</Link></li>
                    </ul>
                </div>

                <div className="contact-details-container custom-ft">
                    <h4 className='gree-secondary'>Contact</h4>
                    <ul>
                        <li className='green'>+91 1234567890</li>
                        <li className='green'>contact@xyz.com</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer