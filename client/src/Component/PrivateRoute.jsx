import React, { useState, Fragment } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from "./Spinner";
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children}) => {
    const { isAuthenticated, loading } = useSelector(state => state.auth)
    if (loading) {
        return <Spinner/>
    }
    return  isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute