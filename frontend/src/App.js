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

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/changePassword' element={<ChangePassword/>}></Route>
        <Route path='/address' element={<Address/>}></Route>
        <Route path='/changeAddress' element={<ChangeAddress/>}></Route>
        <Route path="/search/:keyword" element={<SearchResult/>} />
      </Routes>
    </div>
  );
}

export default App;
