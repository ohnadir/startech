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
import axios from 'axios'
import { useEffect, useState } from 'react';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
function App() {
  const stripeApiKey = 'sk_test_51L2fV2J4Q1QgQO2Dq4mULWGAjBR6MGD0ZLwHzfms34YrEAJepxbKdyQNG4QuUJdE89R7P5Ny2PNkmF0TLXrVdNoX00e0SvWPic'

  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/changePassword' element={<ChangePassword/>}></Route>
        <Route path='/address' element={<Address/>}></Route>
        <Route path='/productDetails' element={<ProductDetails/>}></Route>
        <Route path='/changeAddress' element={<ChangeAddress/>}></Route>
        {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
            <Route path='/checkout' element={<Checkout/>}></Route>
            </Elements>
          }
        <Route path="/search/:keyword" element={<SearchResult/>} />
      </Routes>
    </div>
  );
}

export default App;
