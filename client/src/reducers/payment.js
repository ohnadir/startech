import {
    PAYMENT_PROCESS_REQUEST,
    PAYMENT_PROCESS_SUCCESS,
    PAYMENT_PROCESS_FAIL,
    CLEAR_ERRORS
} from "../constants/payment";

export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
        case PAYMENT_PROCESS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PAYMENT_PROCESS_SUCCESS:
            return {
                loading: false,
                client_secret: action.payload
            }
        case PAYMENT_PROCESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}