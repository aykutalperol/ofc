import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error('Error registering:', err);
      alert('Server error');
    }
  };

  return (
    <Container maxWidth="sm" className="register-container">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box component="form" noValidate autoComplete="off" className="register-form">
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px', borderRadius: '10px' }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
