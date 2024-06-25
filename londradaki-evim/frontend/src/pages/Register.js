import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err.response.data.errors);
      const errorMessages = err.response.data.errors.reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
      }, {});
      setErrors(errorMessages);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {success && <Alert severity="success">Registration successful! Redirecting to login...</Alert>}
      <form onSubmit={onSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
