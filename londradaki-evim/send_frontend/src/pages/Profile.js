import React from 'react';
import { Container, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        Welcome to your profile! Here you can view your personal details and manage your account.
      </Typography>
    </Container>
  );
};

export default Profile;
