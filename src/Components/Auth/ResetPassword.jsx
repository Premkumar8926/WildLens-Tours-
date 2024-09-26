import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import img from "../../assets/linkExpried.jpg"



const ResetPage = () => {
    const [loading, setLoading] = useState(true);

    // Initialize navigate function for redirecting
    const navigate = useNavigate();

    // Retrieve verification string from URL parameters
    const { verificationString } = useParams();

    // State to track if the verification string is valid
    const [verified, setVerified] = useState();

    // State to track if the link has expired
    const [linkExpired, setLinkExpired] = useState(false);

    // Check the validity of the verification string when the component mounts or verificationString changes
    useEffect(() => {
        // POST Call
        axios.post("/user/verifystring", { verificationString }).then(res => {
            setLoading(false);
            if (res.data.message == "matched") {
                setVerified(true);
            }
            else {
                setVerified(false);
                setLinkExpired(true);
            }
            if (res.data.message == "link expired") {
                setLinkExpired(true)
            }
        })
    }, [verificationString])

    // Set up formik for form handling and validation
    const formik = useFormik({

        // Initial values
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },

        // Validations
        validationSchema: yup.object({
            newPassword: yup.string()
                .required('Required')
                .min(8, "Password should be min 8 characters"),
            confirmPassword: yup.string().required("Required")
        }),

        onSubmit: async (values) => { // Function to handle form submission
            const { newPassword, confirmPassword } = values;
            if (newPassword != confirmPassword) {

                toast.error("Password not matching") // Notification
            }
            else {
                setLoading(true);
                try {
                    const response = await axios.post("/user/changepassword", { verificationString, newPassword })
                    setLoading(false);
                    if (response.data.message == "Password changed") {
                        toast.success("Password reset successfully", { // Notification
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            transition: Slide // Use Slide for right-side animation
                        });
                        formik.resetForm();
                        setTimeout(() => {
                            navigate("/login");
                        }, 5000)
                    }

                } catch (error) {
                    setLoading(false);
                    toast.error("Failed to reset password"); // Notification
                }
            }
        }
    })
    return (

        verified ?

            <div className='vh-100 bg d-flex justify-content-center align-items-center bg-color'>
                <div className="outer-container">
                    <p className='title'>Reset Password</p>
                    <p className='text1'>Enter your New password</p>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="input-container">
                            {
                                formik.touched.newPassword && formik.errors.newPassword ?
                                    <div className='erro-msg'>{formik.errors.newPassword}</div> : null
                            }
                            <i className='bx bx-lock-open-alt'></i>
                            <input
                                type="password"
                                placeholder='New Password'
                                {...formik.getFieldProps("newPassword")}
                            ></input>
                        </div>
                        <div className="input-container">
                            {
                                formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                    <div className='erro-msg'>{formik.errors.confirmPassword}</div> : null
                            }
                            <i className='bx bx-lock-alt'></i>
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                {...formik.getFieldProps("confirmPassword")}
                            />
                        </div>
                        <button className='custom-btn' type="submit">Reset Password</button>
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
                {
                    loading &&
                    <div className="loading-container">
                        <ReactLoading type="spinningBubbles" color="#3F775A" />
                    </div>
                }
            </div>

            :

            loading ? <div className="loading-container">
                <ReactLoading type="spinningBubbles" color="#3F775" />
            </div>
                :
                <div className="not-found-page">
                    {
                        <div>
                            {
                                linkExpired ?
                                    <h3 className='text-center'>Link has expired</h3> :
                                    <h3 className='text-center'>Network issues please refresh your screen</h3>

                            }
                            <img className='not-found-page-img' src={img} alt="" />
                        </div>
                    }
                </div>
    )




}

export default ResetPage