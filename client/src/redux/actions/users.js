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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_PASSWORD_CHANGE_REQUEST,
    USER_PASSWORD_CHANGE_SUCCESS,
    USER_PASSWORD_CHANGE_FAIL,
    PUT_USER_INFO_REQUEST,
    PUT_USER_INFO_SUCCESS,
    PUT_USER_INFO_FAIL,
    CLEAR_ERRORS
} from '../constants/users'

import Cookies from 'js-cookie'
// const baseURL = ("https://startech-server.vercel.app/api/v1/users")
const baseURL = ("http://localhost:5001/api/v1/users")

// Login
export const login = (auth) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {'Content-Type' : 'application/json'},
            withCredentials: true
        }

        const { data } = await axios.post(`${baseURL}/login`, auth, config);
        // Cookies.set('token', data.token, { expires: 7 })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error?.response?.data?.message
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        const { data } = await axios.post(`${baseURL}/signup`, userData, config)
        Cookies.set('token', data.token, { expires: 7 })
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

// update user
export const update = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const config = {
            headers: {'Content-Type' : 'application/json'},
            withCredentials: true
        }
        const { data } = await axios.patch(`${baseURL}/update`, userData, config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// all user
export const allUser = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
        const config = {
            headers: {'Content-Type' : 'application/json'},
            withCredentials: true
        }
        const { data } = await axios.get(`${baseURL}`, config)
        
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// all user
export const singleUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const config = {
            headers: {'Content-Type' : 'application/json'},
            withCredentials: true
        }
        const { data } = await axios.get(`${baseURL}/${id}`, config)
        
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Load user
export const loadUser = () => async (dispatch) => {

    try {

        dispatch({ type: LOAD_USER_REQUEST })
        const config = {
            headers: {'Content-Type' : 'application/json'},
            withCredentials: true
        }
        const { data } = await axios.get(`${baseURL}/me`, config)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// change password
export const changePassword = ( userData) => async (dispatch) => {

    try {
        dispatch({ type: USER_PASSWORD_CHANGE_REQUEST })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }
        const { data } = await axios.patch(`${baseURL}/change`, userData, config)
        
        dispatch({
            type: USER_PASSWORD_CHANGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_PASSWORD_CHANGE_FAIL,
            payload: error.response.data.message
        })
    }
}

// change password
export const putUserInfo = ( userData) => async (dispatch) => {
    try {
        dispatch({ type: PUT_USER_INFO_REQUEST })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }
        const { data } = await axios.put(`${baseURL}/info`, userData, config)
        
        dispatch({
            type: PUT_USER_INFO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PUT_USER_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }
        await axios.get(`${baseURL}/logout`, config);
        Cookies.remove('token')
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