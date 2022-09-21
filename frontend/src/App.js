import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import SearchResult from './Component/SearchResult';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1>Nadir Ahmed</h1>
      <Routes>
        <Route path="/search/:keyword" element={<SearchResult/>} />
      </Routes>
    </div>
  );
}

export default App;
