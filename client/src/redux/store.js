import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducer, productDetailsReducer, searchProductReducer } from './reducers/products'
import { authReducer, updateUserReducer, allUsersReducer, userDetailsReducer  } from './reducers/users'
import { orderReducer, emailOrderReducer, OrderDetailsReducer, allOrderReducer  } from './reducers/orders'
import { paymentReducer } from "./reducers/payment"
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    searchProduct: searchProductReducer,
    auth: authReducer,
    update: updateUserReducer,
    users: allUsersReducer,
    user: userDetailsReducer,
    orders : allOrderReducer,
    order : orderReducer,
    orderDetails : OrderDetailsReducer,
    emailOrder : emailOrderReducer,
    payment : paymentReducer

})


const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;