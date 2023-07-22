import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailsReducer} from './reducers/productReducers'
import { paymentReducer } from './reducers/payment'
import { authReducer } from './reducers/userReducers'
import { orderReducer } from './reducers/orderReducers'
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    payment : paymentReducer,
    order : orderReducer
})

const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;