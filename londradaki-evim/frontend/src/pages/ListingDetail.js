import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, LinearProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { isLoggedIn } from '../utils/auth';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const listings = [
  {
    id: 1,
    title: 'Modern Apartment in London',
    images: [
      'https://via.placeholder.com/600x400?text=Modern+Apartment+in+London+1',
      'https://via.placeholder.com/600x400?text=Modern+Apartment+in+London+2',
      'https://via.placeholder.com/600x400?text=Modern+Apartment+in+London+3'
    ],
    description: 'A beautiful modern apartment in the heart of London.',
    ownership: 75,
    details: '2 bedrooms, 1 bathroom, 1 living room, modern kitchen, balcony with a view.',
    price: '£500,000'
  }
];

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === parseInt(id));
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });

  if (!listing) {
    return <Typography variant="h6">Listing not found</Typography>;
  }

  const handleClickOpen = () => {
    if (!isLoggedIn()) {
      navigate('/register');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchase = () => {
    const errors = {};

    if (!formData.cardNumber.match(/^\d{16}$/)) {
      errors.cardNumber = 'Invalid card number';
    }
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.expiryDate = 'Invalid expiry date';
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      errors.cvv = 'Invalid CVV';
    }
    if (!formData.nameOnCard) {
      errors.nameOnCard = 'Name on card is required';
    }
    if (!formData.billingAddress) {
      errors.billingAddress = 'Billing address is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    if (!formData.postalCode) {
      errors.postalCode = 'Postal code is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Handle the purchase logic here
      handleClose();
      alert('Purchase successful');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        {listing.title}
      </Typography>
      <Grid container spacing={4}>
        {listing.images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card style={{ borderRadius: '15px' }}>
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt={`Image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>
        <Typography variant="body1" paragraph>
          {listing.details}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Ownership: {listing.ownership}%
        </Typography>
        <LinearProgress variant="determinate" value={listing.ownership} style={{ borderRadius: '5px' }} />
        <Typography variant="h6" gutterBottom>
          Price: {listing.price}
        </Typography>
        <Button color="primary" component={Link} to="/" style={{ marginTop: '10px', borderRadius: '10px' }}>
          Go Back
        </Button>
        <Button color="primary" onClick={handleClickOpen} style={{ marginTop: '10px', marginLeft: '10px', borderRadius: '10px' }}>
          Purchase
        </Button>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <CreditCardIcon /> Purchase
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              label="Card Number"
              name="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.cardNumber}
              helperText={formErrors.cardNumber}
            />
            <TextField
              margin="dense"
              label="Expiry Date (MM/YY)"
              name="expiryDate"
              type="text"
              value={formData.expiryDate}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.expiryDate}
              helperText={formErrors.expiryDate}
            />
            <TextField
              margin="dense"
              label="CVV"
              name="cvv"
              type="text"
              value={formData.cvv}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.cvv}
              helperText={formErrors.cvv}
            />
            <TextField
              margin="dense"
              label="Name on Card"
              name="nameOnCard"
              type="text"
              value={formData.nameOnCard}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.nameOnCard}
              helperText={formErrors.nameOnCard}
            />
            <TextField
              margin="dense"
              label="Billing Address"
              name="billingAddress"
              type="text"
              value={formData.billingAddress}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.billingAddress}
              helperText={formErrors.billingAddress}
            />
            <TextField
              margin="dense"
              label="City"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.city}
              helperText={formErrors.city}
            />
            <TextField
              margin="dense"
              label="Postal Code"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.postalCode}
              helperText={formErrors.postalCode}
            />
            <TextField
              margin="dense"
              label="Country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.country}
              helperText={formErrors.country}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{ borderRadius: '10px' }}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} color="primary" style={{ borderRadius: '10px' }}>
            Confirm Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListingDetail;
