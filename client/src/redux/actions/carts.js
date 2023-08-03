import { 
    ADD_TO_CART, 
    GET_CART, 
    DECREASE_QUANTITY_CART, 
    REMOVE_ITEM_CART
} from '../constants/carts'

export const addItemToCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: data?.id,
            name: data?.name,
            image : data?.image,
            price: data?.price,
            quantity : data?.quantity,
            total: Number(data?.price) * Number(data?.quantity)
        }
    })

    localStorage.setItem('shopping-cart', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('shopping-cart', JSON.stringify(getState().cart.cartItems))

}

export const decreaseCartQuantity = (id) => async (dispatch, getState) => {
    dispatch({
        type: DECREASE_QUANTITY_CART,
        payload: id
    })

    localStorage.setItem('shopping-cart', JSON.stringify(getState().cart.cartItems))
}

export const getCart = () => async (dispatch) => {
    dispatch({
        type: GET_CART,
        payload : JSON.parse(localStorage.getItem('shopping-cart'))
    })

}