import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import SearchResult from './Component/SearchResult';
import Home from './Page/Home';
import Login from './Page/Login'
import Register from './Page/Register';
import Profile from './Page/Profile'
import ProductDetails from './Page/ProductDetails';
import Checkout from './Page/Checkout';
import Payment from './Component/Modal/Payment';
import { ToastContainer } from 'react-toastify';
import ConfirmPayment from './Component/ConfirmPayment';
import ProtectedRoute from './Component/PrivateRoute'
import CompareProduct from './Component/CompareProduct'
import CategoryProduct from './Page/CategoryProduct';
import BrandProduct from './Page/BrandProduct';
import NotFoundPage from './Page/NotFoundPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
import Dashboard from './Page/Dashboard';
import Chart from './Page/Dashboard/Chart';
import Orders from './Page/Dashboard/Orders';
import Users from './Page/Dashboard/Users';
import Products from './Page/Dashboard/Products';
function App() {
  const data = localStorage.getItem("id");
  let id = ''
  if(data){
    id = JSON.parse(data);
  }
  const dispatch = useDispatch()
  useEffect(()=>{
    if(id){
      dispatch(loadUser(id));
    }
  },[dispatch])
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path="/" exact  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/productDetail/:id' element={<ProductDetails/>}></Route>

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
        </ProtectedRoute>
        }></Route>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
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

        <Route path='/confirmPayment' element={
          <ProtectedRoute>
          <ConfirmPayment/>
        </ProtectedRoute>
        }></Route>
        
        {/* dashboard */}
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route index  element={<Chart isAdmin={true} />}></Route>
          <Route path="orders"  element={<Orders isAdmin={true} />}></Route>
          <Route path="users"  element={<Users isAdmin={true} />}></Route>
          <Route path="products"  element={<Products isAdmin={true} />}></Route>
        </Route>

        <Route path="/search/:keyword" element={<SearchResult/>} />
        <Route path="/compareProduct" element={<CompareProduct/>} />
        <Route path="/categoryProduct/:keyword" element={<CategoryProduct/>} />
        <Route path="/brandProduct/:keyword" element={<BrandProduct/>} />
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
