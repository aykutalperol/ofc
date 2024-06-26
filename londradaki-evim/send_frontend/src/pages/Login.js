import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert('Server error');
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" noValidate autoComplete="off" className="login-form">
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '20px', borderRadius: '10px' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
