import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, removeToken } from '../utils/auth';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
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
        {loggedIn && <Button color="inherit" component={Link} to="/profile">Profile</Button>}
        {!loggedIn && <Button color="inherit" component={Link} to="/register">Register</Button>}
        {!loggedIn ? (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
