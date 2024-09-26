import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({element,role}) => {
    const { login, token, userDetails } = useSelector(state => state.auth);

    if (!login) return <Navigate to="/login" />;

    if (userDetails && userDetails.user) {
        if (userDetails.user.role != role) return <Navigate to="/" />;
    }

    return element;
}

export default ProtectedRoute