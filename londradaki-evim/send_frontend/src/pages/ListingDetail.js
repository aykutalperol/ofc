import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, LinearProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, IconButton } from '@mui/material';
import { isLoggedIn } from '../utils/auth';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import image1 from '../pictures/1.jpeg';
import image2 from '../pictures/2.jpeg';
import image3 from '../pictures/3.jpeg';
import image4 from '../pictures/4.jpeg';
import image5 from '../pictures/5.jpeg';
import image6 from '../pictures/6.jpeg';
import image7 from '../pictures/7_floorplan.png';
import './ListingDetail.css';

const listings = [
  {
    id: 1,
    title: 'Modern Apartment in London',
    images: [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7
    ],
    description: 'A beautiful modern apartment in the heart of London, featuring modern amenities and elegant decor. The apartment includes a cozy living area, a fully equipped kitchen, and a spacious bedroom. The balcony offers a stunning view of the city, making it a perfect place to relax and enjoy the view.',
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
  const [openImage, setOpenImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleImageClickOpen = (index) => {
    setCurrentImageIndex(index);
    setOpenImage(true);
  };

  const handleImageClose = () => {
    setOpenImage(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + listing.images.length) % listing.images.length);
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
    <Container maxWidth="lg" className="details-section">
      <Typography variant="h4" gutterBottom>
        {listing.title}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <div className="main-image-container">
            <img
              src={listing.images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              onClick={() => handleImageClickOpen(currentImageIndex)}
              style={{ cursor: 'pointer' }}
            />
            <div className="nav-button-container">
              <button className="nav-button" onClick={handlePreviousImage}>
                &lt;
              </button>
              <button className="nav-button" onClick={handleNextImage}>
                &gt;
              </button>
            </div>
            <div className="image-count">
              {currentImageIndex + 1}/{listing.images.length}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="side-images">
            {listing.images.slice(currentImageIndex + 1, currentImageIndex + 3).map((image, index) => (
              <div className="side-image" key={index}>
                <img
                  src={image}
                  alt={`Side Image ${index + 1}`}
                  onClick={() => handleImageClickOpen(currentImageIndex + 1 + index)}
                />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>
        <Typography variant="body1" paragraph>
          {listing.description}
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
        <Box display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" component={Link} to="/" style={{ marginTop: '10px', borderRadius: '10px' }}>
            Go Back
          </Button>
          <Button color="primary" variant="contained" onClick={handleClickOpen} style={{ marginTop: '10px', marginLeft: '10px', borderRadius: '10px' }}>
            Purchase
          </Button>
        </Box>
      </CardContent>
      <Dialog open={openImage} onClose={handleImageClose} maxWidth="md" fullWidth>
        <DialogContent>
          <img
            src={listing.images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handlePreviousImage}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={handleNextImage}>
            <NavigateNextIcon />
          </IconButton>
          <IconButton onClick={handleImageClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
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
