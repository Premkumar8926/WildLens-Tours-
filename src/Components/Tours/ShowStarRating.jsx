import React from 'react'

const ShowStarRating = ({ maxStars = 5, rating = 0 }) => {
    return (
        <div className="star-rating">
            {Array.from({ length: maxStars }, (_, index) => (
                <span
                    key={index}
                    className={`star ${index < rating ? 'filled' : ''}`}
                >
                    &#9733; {/* Star character */}
                </span>
            ))}
        </div>
    )
}

export default ShowStarRating