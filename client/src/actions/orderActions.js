import axios from "axios";
import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants"

const baseUrl = "https://startech-server.vercel.app/api/v1";

export const newOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        })
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        const { data } = await axios.post(`${baseUrl}/orders`, order, config);
        dispatch({
            type: ORDER_SUCCESS,
            payload:data
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_FAIL,
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