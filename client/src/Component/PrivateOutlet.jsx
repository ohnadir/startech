import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from "./Spinner";
import { useSelector } from 'react-redux'

const PrivateOutlet = ({ children }) => {
    let location = useLocation();
    const { isAuthenticated, loading } = useSelector(state => state.auth)
    // const isAuthenticated = false
    if (loading) {
        return <Spinner/>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
      
      return children;
}

export default PrivateOutlet