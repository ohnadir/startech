import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'antd/dist/antd.min.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Provider } from 'react-redux'
import store from './redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe('pk_test_51MJynOHzN4rqAg27o1nDk5hQeHaX8cuaBkInxAzGMEnEqee4QMyeztVLqyeuAhzgK9ZRdwPAF8uWFrRX2Qj8iuQ9005XC9m0sA');


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store} >
      <Elements stripe={stripePromise}>
          <App />
      </Elements>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();