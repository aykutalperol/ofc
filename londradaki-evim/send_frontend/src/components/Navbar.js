import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, removeToken } from '../utils/auth'; // Düzeltildi
import { AppBar, Toolbar, Button, Typography } from '@mui/material'; // Düzeltildi
import HomeIcon from '@mui/icons-material/Home'; // Düzeltildi

const Navbar = () => {
  const handleLogout = () => {
    removeToken();
    window.location.href = '/';
  };

  return (
    <AppBar position="static" style={{ background: '#2E3B55', height: '64px', zIndex: 2 }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/" style={{ marginRight: '10px' }}>
          <HomeIcon />
        </Button>
        <Button color="inherit" component={Link} to="/" style={{ textTransform: 'none' }}>
          <Typography variant="h6">
            Londradaki Evim
          </Typography>
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {isLoggedIn() && <Button color="inherit" component={Link} to="/profile">Profile</Button>}
        <Button color="inherit" component={Link} to="/contact">Contact</Button> {/* Contact link eklendi */}
        {!isLoggedIn() && <Button color="inherit" component={Link} to="/register">Register</Button>}
        {!isLoggedIn() ? (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
