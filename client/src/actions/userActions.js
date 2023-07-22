
import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

import Cookies from "js-cookie"
const link = "http://localhost:5001";
// const link = "https://startech-server.vercel.app";
// Login
export const login = (auth) => async (dispatch) => {
    const {email, password} = auth;
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        const { data } = await axios.post(`${link}/api/v1/users/login`, { email, password }, config)
        console.log(data);
        // Cookies.set('token', JSON.stringify(data.token), {expires: 7});// Cookies.set('token', JSON.stringify(data.token), {expires: 7});
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${link}/api/v1/users/signup`, userData, config)
        
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
// load user
export const loadUser = () => async(dispatch)=>{
    try{
        dispatch({ type: LOAD_USER_REQUEST })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }
        const { data } = await axios.get(`${link}/api/v1/users/me`, config)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`${link}/api/v1/users/logout`)

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}