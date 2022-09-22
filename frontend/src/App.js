import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import SearchResult from './Component/SearchResult';
import Home from './Page/Home';
import Login from './Page/Login'
import Register from './Page/Register'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/search/:keyword" element={<SearchResult/>} />
      </Routes>
    </div>
  );
}

export default App;
