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
import { ToastContainer } from 'react-toastify';
import ConfirmPayment from './Component/ConfirmPayment';
function App() {
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
        <Route path='/productDetail/:id' element={<ProductDetails/>}></Route>
        <Route path='/changeAddress' element={<ChangeAddress/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/confirmPayment' element={<ConfirmPayment/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path="/search/:keyword" element={<SearchResult/>} />
      </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;