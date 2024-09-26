import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { useFormik } from 'formik'

const BookTour = ({ tour, setIsBooking }) => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBooking = async (values) => {
        setLoading(true);
        try {
            // Request to create a Razorpay order
            const response = await axios.post('/tour/create-order', { amount: tour.price });
            const { id, currency, amount: orderAmount } = response.data;

            setLoading(false);

            const options = {
                key: 'rzp_test_gijcvzVIahNMp1', 
                amount: orderAmount,
                currency: currency,
                name: 'WildLens Tours',
                description: 'Tour booking',
                order_id: id,
                handler: async function (response) {
                    
                    console.log('Payment successful', response);
                },
                prefill: {
                    name: values.name,
                    email: values.email,
                    contact: values.mobileNo
                },
                theme: {
                    color: '#28523E'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            setLoading(false);
            toast.error("Please try again later.");
            console.error('Error creating Razorpay order:', error);
        }
    };

    const formik = useFormik({

        // Initial values
        initialValues: {
            email: '',
            name: '',
            mobileNo: '',
            companions: ''
        },

        // Validations
        validationSchema: yup.object({
            email: yup.string()
                .email('Invalid email')
                .required('Email is required'),
            name: yup.string()
                .required("Name is required"),
            mobileNo: yup.string()
                .required("Mobile no is required")
                .matches(/^\d{10}$/, "Invalid mobile no"),
            companions: yup.number()
                .max((tour.travellersLimit - 1), `Max ${tour.travellersLimit - 1} companions`)

        }),

        onSubmit: (values) => {   // Function to handle form submission
            handleBooking(values)
            formik.resetForm();
        }
    })

    return (
        <>
            {
                loading &&
                <div className="loading-container">
                    <ReactLoading type="spinningBubbles" color="#3F775A" />
                </div>
            }
            <div className='header'>
                <div className="container inner-header">
                    <div className="logo">
                        <h1 className='d-flex align-items-center'>
                            <i className='bx bxs-leaf mx-2'></i>WildLens Tours
                        </h1>
                    </div>
                    <button className='return-btn' onClick={() => setIsBooking(false)}>
                        <i className='bx bxs-chevrons-left'></i>Back
                    </button>
                </div>
            </div>

            <div className='bg d-flex justify-content-center align-items-center bg-color'>
                <div className="outer-container">
                    <p className='title'>Let's start</p>
                    <p className='text1'>Kindly fill the details</p>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="input-container">
                            {
                                formik.touched.name && formik.errors.name ?
                                    <div className='erro-msg'>{formik.errors.name}</div> : null
                            }
                            <i className='bx bx-user'></i>
                            <input
                                type="text"
                                placeholder='Name'
                                {...formik.getFieldProps("name")}
                            ></input>
                        </div>
                        <div className="input-container">
                            {
                                formik.touched.email && formik.errors.email ?
                                    <div className='erro-msg'>{formik.errors.email}</div> : null
                            }
                            <i className='bx bx-envelope'></i>
                            <input
                                type="email"
                                placeholder='Email'
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <div className="input-container">
                            {
                                formik.touched.mobileNo && formik.errors.mobileNo ?
                                    <div className='erro-msg'>{formik.errors.mobileNo}</div> : null
                            }
                            <i className='bx bx-phone-call' ></i>
                            <input
                                type="text"
                                placeholder='Mobile no'
                                {...formik.getFieldProps("mobileNo")}
                            />
                        </div>
                        <div className="input-container">
                            {
                                formik.touched.companions && formik.errors.companions ?
                                    <div className='erro-msg'>{formik.errors.companions}</div> : null
                            }
                            <i className='bx bx-user-plus' ></i>
                            <input
                                type="text"
                                placeholder='Companions'
                                {...formik.getFieldProps("companions")}
                            />
                        </div>
                        <div className="action-btns">
                            <button className='check-out' type="submit">Check out</button>
                            <button className='brochure' type="button">Brochure</button>
                        </div>
                    </form>

                </div>

                {/* Toast container for displaying notifications */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </div>
        </>
    );
};

export default BookTour;
