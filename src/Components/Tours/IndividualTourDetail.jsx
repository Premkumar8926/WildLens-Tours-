import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserReview from './UserReview';
import StarRating from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addReview } from '../../Slices/TourSlice';
import Footer from '../Layouts/Footer';
import BookTour from './BookTour';

const IndividualTourDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { tourId } = location.state;
    const { tours, currentTourId } = useSelector(state => state.tour);
    const tourIdFromLocalStorage = window.localStorage.getItem("currentTourId");
    const tourId = tourIdFromLocalStorage;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { token, login } = useSelector(state => state.auth);


    const tour = tours.find(tour => tour._id === tourId);

    const [rating, setRating] = useState(0);
    const [reviewBtnClicked, setReviewBtnClicked] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [tourId]);

    const formik = useFormik({
        initialValues: {
            review: '',
            rating: rating
        },
        validationSchema: yup.object({
            review: yup.string().required("Review required"),
            rating: yup.number().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5").required("Rating required")
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm();
            setRating(0);
            setReviewBtnClicked(false);
            setLoading(true);

            axios.post("/tour/addreview", { tourId, rating: values.rating, content: values.review }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data.message === "Review added") {
                    dispatch(addReview({ tourId, review: { ...res.data.newReview, likes: 0, dislikes: 0 } }));
                    setLoading(false);
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
                }
            }).catch(error => {
                setLoading(false);
                toast.error("Failed to add review. Please try again later.");
            });
        }
    });

    const handleRatingChange = useCallback((newRating) => {
        setRating(newRating);
        formik.setFieldValue('rating', newRating);
    }, [formik]);

    if (!tour) {
        navigate("/alltours")
        return <div>Loading...</div>; // Handle loading or error state if tour is not found
    }

    const handleAddReview = () => {
        if (login) {
            setReviewBtnClicked(!reviewBtnClicked);
        }
        else {
            navigate("/login", { state: { from: window.location.pathname } })
        }
    }

    const handleBook = () => {
        if (login) {
            setIsBooking(true);
        }
        else {
            navigate("/login", { state: { from: window.location.pathname } });
        }
    }

    return (
        <>
            {
                !isBooking ?
                    (
                        <>
                            {loading && (
                                <div className="loading-container">
                                    <ReactLoading type="spinningBubbles" color="#3F775A" />
                                </div>
                            )}
                            <div className='header'>
                                <div className="container inner-header">
                                    <div className="logo">
                                        <h1 className='d-flex align-items-center'>
                                            <i className='bx bxs-leaf mx-2'></i>WildLens Tours
                                        </h1>
                                    </div>
                                    <button className='return-btn' onClick={() => navigate("/alltours")}>
                                        <i className='bx bxs-chevrons-left'></i>Back
                                    </button>
                                </div>
                            </div>

                            <div className="info-container container">
                                <h1 className='title'>{tour.title}</h1>
                                <p>{tour.durationAndLimit}</p>

                                {tour.sections[0] && (
                                    <section className="intro-section">
                                        <h2>{tour.sections[0].title}</h2>
                                        <p>{tour.sections[0].content}</p>
                                    </section>
                                )}

                                {tour.img && (
                                    <div className='img-container'>
                                        <img src={tour.img} alt="Tour" />
                                    </div>
                                )}

                                {tour.sections[1] && (
                                    <section className="highlights-section">
                                        <h2>{tour.sections[1].title}</h2>
                                        {tour.sections[1].highlights.map((highlight, index) => (
                                            <div key={index} className="highlight">
                                                <h3>{index + 1}) {highlight.title}</h3>
                                                <p>{highlight.description}</p>
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {tour.sections[2] && (
                                    <section className="visit-info-section">
                                        <h2>{tour.sections[2].title}</h2>
                                        {tour.sections[2].info.map((info, index) => (
                                            <div key={index} className="info-item">
                                                <h3>{info.title}</h3>
                                                {info.title === "Important Tips" ? (
                                                    <ul>
                                                        {info.tips.map((tip, i) => (
                                                            <li key={i}>{tip}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>{info.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {tour.sections[3] && (
                                    <section className="contact-section">
                                        <h2>{tour.sections[3].title}</h2>
                                        <p>{tour.sections[3].description}</p>
                                        <h3>{tour.sections[3].contact.title}</h3>
                                        <p>{tour.sections[3].contact.description}</p>
                                    </section>
                                )}

                                <div className="action-buttons">
                                    <button className='book-now' onClick={handleBook}>Book now</button>
                                    <button onClick={handleAddReview} className='add-review-btn'>
                                        Add review
                                    </button>
                                </div>

                                {reviewBtnClicked && (
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="add-review mt-4">
                                            <h4 className='green'>Give your rating</h4>
                                            {formik.touched.rating && formik.errors.rating && (
                                                <div className='erro-msg'>{formik.errors.rating}</div>
                                            )}
                                            <div className="rating">
                                                <StarRating rating={rating} onChange={handleRatingChange} />
                                            </div>

                                            {formik.touched.review && formik.errors.review && (
                                                <div className='erro-msg'>{formik.errors.review}</div>
                                            )}
                                            <textarea
                                                name="review"
                                                placeholder='Add your experience and review'
                                                {...formik.getFieldProps('review')}
                                            />
                                            <button type="submit" className='return-btn custom'>Submit</button>
                                        </div>
                                    </form>
                                )}

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
                                <div className="community-engagement">
                                    <h1 className='mt-3'>Read what travelers are saying about our {tour.title}</h1>
                                    <div className="user-reviews">
                                        {
                                            tour.reviews && tour.reviews.map((review, index) => (
                                                <UserReview key={index} review={review} tourId={tour._id} setLoading={setLoading} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </>
                    ) :
                    (
                        <BookTour tour={tour} setIsBooking={setIsBooking} />
                    )
            }

        </>
    );
};

export default IndividualTourDetail;
