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
import ProtectedRoute from './Component/ProtectedRoute'
import CompareProduct from './Component/CompareProduct'
import CategoryProduct from './Page/CategoryProduct';
import BrandProduct from './Page/BrandProduct';
function App() {
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path="/" exact  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path='/profile' element={
          <ProtectedRoute >
            <Profile/>
          </ProtectedRoute>
        }></Route>

        <Route path='/changePassword' element={
          <ProtectedRoute >
            <ChangePassword/>
          </ProtectedRoute>
        }></Route>

        <Route path='/address' element={
          <ProtectedRoute >
            <Address/>
          </ProtectedRoute>
        }></Route>

        <Route path='/productDetail/:id' element={<ProductDetails/>}></Route>

        <Route path='/changeAddress' element={
          <ProtectedRoute >
            <ChangeAddress/>
          </ProtectedRoute>
        }></Route>

        <Route path='/payment' element={
          <ProtectedRoute >
            <Payment/>
          </ProtectedRoute>
        }></Route>

        <Route path='/confirmPayment' element={
          <ProtectedRoute >
            <ConfirmPayment/>
          </ProtectedRoute>
        }></Route>

        <Route path='/checkout' element={
          <ProtectedRoute >
            <Checkout/>
          </ProtectedRoute>
        }></Route>

        <Route path="/search/:keyword" element={<SearchResult/>} />
        <Route path="/compareProduct" element={<CompareProduct/>} />
        <Route path="/categoryProduct/:keyword" element={<CategoryProduct/>} />
        <Route path="/brandProduct/:keyword" element={<BrandProduct/>} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
