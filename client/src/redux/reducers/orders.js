import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL,
    EMAIL_ORDER_REQUEST,
    EMAIL_ORDER_SUCCESS,
    EMAIL_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/orders"

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload.order
            }
        case ORDER_FAIL:
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

export const OrderDetailsReducer = (state = { order : {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order : action.payload.order
            }
        case ORDER_DETAILS_FAIL:
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

export const allOrderReducer = (state = {orders : []}, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDERS_SUCCESS:
            return {
                loading: false,
                orders : action.payload.orders
            }
        case ORDERS_FAIL:
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

export const emailOrderReducer = (state = { orders: []}, action) => {
    switch (action.type) {
        case EMAIL_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case EMAIL_ORDER_SUCCESS:
            return {
                loading: false,
                orders : action.payload.orders
            }
        case EMAIL_ORDER_FAIL:
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