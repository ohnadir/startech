import axios from 'axios'
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/products';

// const baseURL = ("https://startech-server.vercel.app/api/v1/products")
const baseURL = ("http://localhost:5001/api/v1/products")

export const getProducts = (page, size) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        let link = (`${baseURL}?page=${page}&size=${size}`)

        const { data } = await axios.get(link, config)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getFilterProducts = (keyword = '', category, brand ) => async (dispatch) => {
    try {

        dispatch({ type: SEARCH_PRODUCT_REQUEST })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }
        let data; 
        if(keyword){
            data = await axios.get(`${baseURL}/search?keyword=${keyword} `, config)
        }
        if(category){
            data = await axios.get(`${baseURL}/search?keyword=${keyword}&category=${category}`, config)
        }
        if(brand){
            data = await axios.get(`${baseURL}/search?brand=${brand}`, config)
        }
        console.log(data);
        dispatch({
            type: SEARCH_PRODUCT_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const config = {
            headers: { 'Content-Type' : 'application/json' },
            withCredentials: true
        }

        const { data } = await axios.get(`${baseURL}/details/${id}`, config);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
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