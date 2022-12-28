import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import SearchResult from './Component/SearchResult';
import Home from './Page/Home';
import Login from './Page/Login'
import Register from './Page/Register';
import Profile from './Page/Profile'
import ChangePassword from './Page/ChangePassword';
import Address from './Page/Address';
import ChangeAddress from './Page/ChangeAddress';
import ProductDetails from './Page/ProductDetails';
import Checkout from './Page/Checkout';
import Payment from './Component/Modal/Payment';
import axios from 'axios'
import { useEffect, useState } from 'react';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
function App() {
  const stripeApiKey = 'pk_test_51MJynOHzN4rqAg27o1nDk5hQeHaX8cuaBkInxAzGMEnEqee4QMyeztVLqyeuAhzgK9ZRdwPAF8uWFrRX2Qj8iuQ9005XC9m0sA'
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path="/" exact  element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/changePassword' element={<ChangePassword/>}></Route>
        <Route path='/address' element={<Address/>}></Route>
        <Route path='/productDetails' element={<ProductDetails/>}></Route>
        <Route path='/changeAddress' element={<ChangeAddress/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path="/search/:keyword" element={<SearchResult/>} />
      </Routes>
    </div>
  );
}

export default App;
