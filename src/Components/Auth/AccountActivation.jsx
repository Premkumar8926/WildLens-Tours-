import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';

const AccountActivation = () => {
    const { token } = useParams();  // Token passed in the URL
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        // Use POST instead of GET, as your backend expects a POST request
        axios.post("/user/activateaccount", {}, {
            headers: {
                Authorization: `Bearer ${token}`  // Pass token in the Authorization header
            }
        }).then(res => {
            if (res.data.message === "activated" || res.data.message === "Already activated") {
                setStatus(true);
                navigate("/login");
            } else {
                // Handle other potential responses here if necessary
            }
        }).catch(error => {
            console.error("Account activation failed:", error);
            // Handle error (optional: show message to user)
        });
    }, []);  // No need to include 'status' in the dependency array

    return (
        <div className="loading-container">
            <ReactLoading type="spinningBubbles" color="#3F775A" />
        </div>
    );
};

export default AccountActivation;
