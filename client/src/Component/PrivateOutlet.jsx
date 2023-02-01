import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from 'react-redux'

const PrivateOutlet = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth)
    // const isAuthenticated = false
    if (loading) {
        return <Spinner/>
    }
    return  isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateOutlet