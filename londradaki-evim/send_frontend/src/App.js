import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ListingDetail from './pages/ListingDetail';
import Purchase from './pages/Purchase';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="background"></div> {/* Arka plan resmini ekliyoruz */}
        <div className="overlay"></div> {/* Şeffaf örtüyü ekliyoruz */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listing/:id" element={<ListingDetail />} /> {/* ListingDetail rotasını ekliyoruz */}
            <Route path="/purchase/:id" element={<Purchase />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
