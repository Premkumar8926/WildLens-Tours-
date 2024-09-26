import React, { useState } from 'react';
import * as yup from 'yup';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Slices/DashboardSlice';

const DashboardMarketing = () => {
    const { datas,isLoading } = useSelector(state => state.dashboard);

    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const formik = useFormik({
        // Initial values
        initialValues: {
            subject: '',
            content: ''
        },

        // Validations
        validationSchema: yup.object({
            subject: yup.string()
                .required('Subject is required'),
            content: yup.string()
                .required("Content is required")
        }),

        onSubmit: (values) => {   // Function to handle form submission
            const userDetails = {
                subject: values.subject.trim(),
                content: values.content.trim()
            };

            dispatch(setLoading(true));
            axios.post("/user/sendbulkmail", userDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                dispatch(setLoading(false));
                if (res.data.message === "success") {
                    formik.resetForm();
                    toast.success("Email sent successfully", {  // Notification
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        transition: Slide // Use Slide for right-side animation
                    });
                } else {
                    dispatch(setLoading(false));
                    toast.error("Unexpected response. Please try again later.");
                }
            }).catch(error => {
                dispatch(setLoading(false));
                console.error("Error sending email:", error); // Log error for debugging
                toast.error("Failed. Please try again later."); // Notification
            });
        }
    });

    return (
        <>
            <div className="main">
                
                <div className="marketing">
                    <form onSubmit={formik.handleSubmit}>
                        <h3>Email Marketing <i className='bx bxs-envelope'></i></h3>
                        <p>Send promotional emails to all users</p>

                        <div className="input-container-db mt-2">
                            {formik.touched.subject && formik.errors.subject ? (
                                <div className='erro-msg '>{formik.errors.subject}</div>
                            ) : null}
                            <input
                                type="text"
                                placeholder='Email Subject'
                                {...formik.getFieldProps("subject")}
                            />
                        </div>

                        <div className="input-container-db mt-2">
                            {formik.touched.content && formik.errors.content ? (
                                <div className='erro-msg '>{formik.errors.content}</div>
                            ) : null}
                            <textarea
                                placeholder='Email Content'
                                {...formik.getFieldProps("content")}
                            />
                        </div>

                        <button className='return-btn custom' type="submit">Send</button>
                    </form>
                </div>
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
}

export default DashboardMarketing;
