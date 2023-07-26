import axios from "axios";
import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    EMAIL_ORDER_REQUEST,
    EMAIL_ORDER_SUCCESS,
    EMAIL_ORDER_FAIL,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL,
    CLEAR_ERRORS
} from "../constants/orders";

// const baseURL = "https://startech-server.vercel.app/api/v1/orders";
const baseURL = "http://localhost:5001/api/v1/orders";

export const newOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        const { data } = await axios.post(`${baseURL}`, order, config);
        dispatch({
            type: ORDER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const orderList = () => async (dispatch) => {
    try {
        dispatch({
            type:ORDERS_REQUEST
        })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        const { data } = await axios.get(`${baseURL}`, config);
        dispatch({
            type: ORDERS_SUCCESS,
            payload:data
        })
    }
    catch (error) {
        dispatch({
            type: ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        const { data } = await axios.get(`${baseURL}/details/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload:data
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const emailOrder = () => async (dispatch) => {
    try {
        dispatch({
            type: EMAIL_ORDER_REQUEST
        })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }
        
        const { data } = await axios.get(`${baseURL}/email`, config);
        dispatch({
            type: EMAIL_ORDER_SUCCESS,
            payload:data
        })
    }
    catch (error) {
        dispatch({
            type: EMAIL_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}



//  Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}