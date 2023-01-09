import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from "./Spinner"

const ProtectedRoute = ({ children }) => {
    let [user, setUser] = useState('');
    let location = useLocation();
    // let { isAuthenticated, loading, user } = useSelector(state => state.auth)
    /* if (loading) {
        return <Spinner/>
    } */
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default ProtectedRoute