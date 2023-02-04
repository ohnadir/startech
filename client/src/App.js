import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import SearchResult from './Component/SearchResult';
import Home from './Page/Home';
import Login from './Page/Login'
import Register from './Page/Register';
import Profile from './Page/Profile'
import ChangePassword from './Page/ChangePassword';
import ProductDetails from './Page/ProductDetails';
import Checkout from './Page/Checkout';
import Payment from './Component/Modal/Payment';
import { ToastContainer } from 'react-toastify';
import ConfirmPayment from './Component/ConfirmPayment';
import ProtectedRoute from './Component/PrivateRoute'
import CompareProduct from './Component/CompareProduct'
import CategoryProduct from './Page/CategoryProduct';
import BrandProduct from './Page/BrandProduct';
import PrivateOutlet from './Component/PrivateOutlet';
import NotFoundPage from './Page/NotFoundPage';
function App() {
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path="/" exact  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/productDetail/:id' element={<ProductDetails/>}></Route>

        <Route path="/" element={<PrivateOutlet />}>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/changePassword' element={<ChangePassword/>}></Route>
          <Route path='/payment' element={<Payment/>}></Route>
          <Route path='/confirmPayment' element={<ConfirmPayment/>}></Route>
          <Route path='/checkout' element={<Checkout title="Dashboard"/>}></Route>
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
