import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ListingDetail from './pages/ListingDetail';
import Purchase from './pages/Purchase';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/purchase/:id" element={<Purchase />} />
      </Routes>
    </Router>
  );
};

export default App;
