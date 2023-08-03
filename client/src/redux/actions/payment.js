import axios from "axios";
import {
    PAYMENT_PROCESS_REQUEST,
    PAYMENT_PROCESS_SUCCESS,
    PAYMENT_PROCESS_FAIL,
    CLEAR_ERRORS
} from "../constants/payment"

const baseURL = "https://startech-server.vercel.app/api/v1/payments"

export const  makePayment = (paymentData)=> async(dispatch)=>{
    try {
        dispatch({ type: PAYMENT_PROCESS_REQUEST })
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.post(`${baseURL}/process`, paymentData, config)
        dispatch({
            type: PAYMENT_PROCESS_SUCCESS,
            payload: data.client_secret
        })
    } catch (error) {
        dispatch({
            type: PAYMENT_PROCESS_FAIL,
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