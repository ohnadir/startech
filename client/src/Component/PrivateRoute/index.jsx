import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Loader from "../Loader";
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children}) => {
    let location = useLocation();
    const { isAuthenticated, loading } = useSelector(state => state.auth);
    if (loading ) {
        return <Loader/>
      }
      if (isAuthenticated) {
        return children;
      }
      return <Navigate to="/login" state={{ from: location }} replace />;
      
}

export default ProtectedRoute;