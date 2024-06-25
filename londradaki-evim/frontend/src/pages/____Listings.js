import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings/all');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Listings
      </Typography>
      <Grid container spacing={3}>
        {listings.map(listing => (
          <Grid item key={listing._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{listing.title}</Typography>
                <Typography variant="body2">{listing.description}</Typography>
                <Typography variant="body2">Price: ${listing.price}</Typography>
                <Typography variant="body2">Location: {listing.location}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Listings;
