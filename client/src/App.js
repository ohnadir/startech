import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Page/Home';
import Login from './Page/Login'
import Register from './Page/Register';
import Profile from './Page/Profile'
import ProductDetails from './Page/ProductDetails';
import Checkout from './Page/Checkout';
import Payment from './Page/Checkout/Payment';
import { ToastContainer } from 'react-toastify';
import ConfirmPayment from './Page/ConfirmPayment';
import ProtectedRoute from './Component/PrivateRoute'
import CompareProduct from './Component/CompareProduct'
import CategoryProduct from './Page/CategoryProduct';
import BrandProduct from './Page/BrandProduct';
import NotFoundPage from './Page/NotFoundPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/users';
import SearchProduct from './Page/SearchProduct';
import Invoice from './Page/Invoice';
import MyOrder from './Page/Profile/MyOrder/MyOrder';
import ChangePassword from './Page/Profile/ChangePassword';
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
    
  },[ dispatch ]);
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" exact  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/productDetails/:id' element={<ProductDetails/>}></Route>

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
        </ProtectedRoute>
        }></Route>
      
        <Route path='/checkout' element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
        }>
        </Route>

        <Route path='/payment' element={
          <ProtectedRoute>
            <Payment/>
        </ProtectedRoute>
        }></Route>
        <Route path='/invoice/:id' element={
          <ProtectedRoute>
            <Invoice/>
        </ProtectedRoute>
        }></Route>

        <Route path='/confirmPayment' element={
          <ProtectedRoute>
          <ConfirmPayment/>
        </ProtectedRoute>
        }></Route>

        <Route path='/myOrders' element={
          <ProtectedRoute>
          <MyOrder/>
        </ProtectedRoute>
        }></Route>
        
        <Route path='/changePassword' element={
          <ProtectedRoute>
          <ChangePassword/>
        </ProtectedRoute>
        }></Route>
        <Route path="/search/:keyword" element={<SearchProduct/>} />
        <Route path="/compareProduct" element={<CompareProduct/>} />
        <Route path="/categoryProduct/:category" element={<CategoryProduct/>} />
        <Route path="/brandProduct/:brand" element={<BrandProduct/>} />
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
