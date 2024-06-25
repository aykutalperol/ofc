import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      setToken(res.data.token);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
    } catch (err) {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {success && <Alert severity="success">Login successful! Redirecting to homepage...</Alert>}
      <form onSubmit={onSubmit}>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.general}
          helperText={errors.general}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          fullWidth
          margin="normal"
          error={!!errors.general}
          helperText={errors.general}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
          Login
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body1">Üye değilseniz kayıt olun</Typography>
        <Button color="secondary" component={Link} to="/register">Kayıt Ol</Button>
      </Box>
    </Container>
  );
};

export default Login;
