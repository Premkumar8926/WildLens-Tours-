import React, { useEffect, useState } from 'react';
import img from "../../assets/user_profile.jpg";
import ShowStarRating from './ShowStarRating';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteReview, setReview } from '../../Slices/TourSlice';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserReview = ({ review, tourId, setLoading }) => {
    const { login, userDetails, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    
    const userId = userDetails?.user?._id;
    const reviewId = review._id;

    const dispatch = useDispatch();

    const [showAllComments, setShowAllComments] = useState(false);

    const [rating, setRating] = useState(review.rating);
    const [likes, setLikes] = useState(review.likes);
    const [dislikes, setDislikes] = useState(review.dislikes);
    const [liked, setLiked] = useState(review.likedUsers.includes(userId));
    const [disliked, setDisliked] = useState(review.dislikedUsers.includes(userId));

    const [localLikedUsers, setLocalLikedUsers] = useState([...review.likedUsers]);
    const [localDislikedUsers, setLocalDislikedUsers] = useState([...review.dislikedUsers]);

    const [isEditing, setIsEditing] = useState(false);

    const [content, setContent] = useState(review.content);

    const handleLike = async () => {
        if (login && userId) {
            let updatedLikedUsers = [...localLikedUsers];
            let updatedDislikedUsers = [...localDislikedUsers];


            if (disliked) {
                setDislikes(dislikes - 1);
                setDisliked(false);
                updatedDislikedUsers = updatedDislikedUsers.filter(id => id !== userId);
            }
            if (!liked) {
                setLikes(likes + 1);
                setLiked(true);
                updatedLikedUsers.push(userId);
                updatedDislikedUsers = updatedDislikedUsers.filter(id => id !== userId);
            }

            setLocalLikedUsers(updatedLikedUsers);
            setLocalDislikedUsers(updatedDislikedUsers);

            try {
                await axios.patch("/tour/updateuseraction", {
                    reviewId,
                    likedUsers: updatedLikedUsers,
                    dislikedUsers: updatedDislikedUsers,
                    likes: updatedLikedUsers.length,
                    dislikes: updatedDislikedUsers.length,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error updating like:', error);
                
            }
        } else {
            navigate("/login");
        }
    };

    const handleDislike = async () => {
        if (login && userId) {
            let updatedLikedUsers = [...localLikedUsers];
            let updatedDislikedUsers = [...localDislikedUsers];

            if (liked) {
                setLikes(likes - 1);
                setLiked(false);
                updatedLikedUsers = updatedLikedUsers.filter(id => id !== userId);
            }
            if (!disliked) {
                setDislikes(dislikes + 1);
                setDisliked(true);
                updatedDislikedUsers.push(userId);
            }

            setLocalLikedUsers(updatedLikedUsers);
            setLocalDislikedUsers(updatedDislikedUsers);

            try {
                await axios.patch("/tour/updateuseraction", {
                    reviewId,
                    likedUsers: updatedLikedUsers,
                    dislikedUsers: updatedDislikedUsers,
                    likes: updatedLikedUsers.length,
                    dislikes: updatedDislikedUsers.length
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error updating dislike:', error);
                
            }
        } else {
            navigate("/login");
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleDelete = async () => {
        setLoading(true);
        try {
            
            const res = await axios.delete(`/tour/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(deleteReview({ tourId, reviewId }));
            setLoading(false);

            if (res.data.message == "success") {
                toast.success("Review saved", {  // Notification
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
            
        } catch (error) {
            console.error('Error deleting review:', error);

        }
    };
    const handleSave = async () => {
        setIsEditing(false)
        setLoading(true);
        try {
            
            const res = await axios.patch("/tour/savecontent", {
                reviewId,
                content 
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(setReview({ tourId, content, reviewId }));
            setLoading(false);


        } catch (error) {
            console.error('Error updating review content:', error);
            
        }
    }

    const updateChanges = (event) => {

        setContent(event.target.value);
    };

    useEffect(() => {
        if (login && userId) {
            setLiked(review.likedUsers.includes(userId));
            setDisliked(review.dislikedUsers.includes(userId));
        }
    }, [review.likedUsers, review.dislikedUsers, login, userId]);

    return (
        <div className="review-container mb-4">
            <div className="user-details-container">
                <img src={img} alt="User profile" />
                <h3>{review.userName}</h3>
            </div>
            <div className="rating">
                <ShowStarRating rating={rating} />
            </div>
            <div className="review-content">
                {
                    !isEditing ?
                        <p>{review.content}</p> :
                        <textarea name=""
                            value={content} id=""
                            onChange={(e) => updateChanges(e)}
                            autoFocus
                        ></textarea>
                }
            </div>
            <div className="like-dislikes">
                <button
                    className={`like-button ${liked ? 'active' : ''}`}
                    onClick={handleLike}
                >
                    👍 {likes}
                </button>
                <button
                    className={`dislike-button ${disliked ? 'active' : ''}`}
                    onClick={handleDislike}
                >
                    👎 {dislikes}
                </button>
            </div>
            {
                userId == review.userId &&
                <div className="edit-delete-btn">
                    {
                        !isEditing ?
                            <button onClick={handleEdit} type="submit" className='edit'>Edit</button> :
                            <button onClick={handleSave} type="submit" className='save'>Save</button>
                    }
                    <button onClick={handleDelete} type="submit" className='delete'>Delete</button>
                </div>
            }
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
                showAllComments &&
                <div className="all-comments mt-3">
                    
                    <div className="comment">
                        <h4>user name</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere aperiam, id doloribus aliquid sunt rem dolor molestiae, pla</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserReview;
