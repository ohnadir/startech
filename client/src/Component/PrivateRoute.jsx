import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from "./Spinner";
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children}) => {
    let location = useLocation();
    const { isAuthenticated, loading } = useSelector(state => state.auth);
    console.log(loading);
    console.log(isAuthenticated);
    if (loading || loading === undefined) {
        return <Spinner/>
      }
      if (isAuthenticated) {
        return children;
      }
      return <Navigate to="/login" state={{ from: location }} replace />;
      
}

export default ProtectedRoute;