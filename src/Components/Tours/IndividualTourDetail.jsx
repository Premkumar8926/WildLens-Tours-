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
                !isBooking ? (
                    <>
                        {loading && <ReactLoading type="spinningBubbles" color="#3F775A" />}
                        <div className='header'> {/* Header section with logo and back button */}</div>
                        <div className="info-container container">
                            <h1 className='title'>{tour.title}</h1>
                            <p>{tour.durationAndLimit}</p>
                            {tour.sections[0] && <section>{/* Intro Section */}</section>}
                            {tour.img && <img src={tour.img} alt="Tour" />}
                            {tour.sections[1] && <section>{/* Highlights Section */}</section>}
                            {tour.sections[2] && <section>{/* Visit Info Section */}</section>}
                            {tour.sections[3] && <section>{/* Contact Section */}</section>}
    
                            {/* Action buttons for booking and adding reviews */}
                            <div className="action-buttons">
                                <button className='book-now' onClick={handleBook}>Book now</button>
                                <button onClick={handleAddReview} className='add-review-btn'>Add review</button>
                            </div>
    
                            {/* Review form */}
                            {reviewBtnClicked && (
                                <form onSubmit={formik.handleSubmit}>
                                    {/* Star Rating and review textarea */}
                                    <textarea name="review" placeholder='Add your experience' {...formik.getFieldProps('review')} />
                                    <button type="submit" className='return-btn custom'>Submit</button>
                                </form>
                            )}
    
                            {/* User reviews section */}
                            <div className="community-engagement">
                                <h1>Read what travelers are saying</h1>
                                <div className="user-reviews">
                                    {tour.reviews.map((review, index) => (
                                        <UserReview key={index} review={review} tourId={tour._id} setLoading={setLoading} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
                ) : (
                    <BookTour tour={tour} setIsBooking={setIsBooking} />
                )
            }
        </>
    );
    
};

export default IndividualTourDetail;
