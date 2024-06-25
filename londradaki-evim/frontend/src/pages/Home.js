import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, LinearProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const listings = [
  {
    id: 1,
    title: 'Modern Apartment in London',
    image: 'https://via.placeholder.com/600x400?text=Modern+Apartment+in+London',
    description: 'A beautiful modern apartment in the heart of London.',
    ownership: 75,
    price: '£500,000'
  }
];

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Featured Listings
      </Typography>
      <Grid container spacing={4}>
        {listings.map(listing => (
          <Grid item key={listing.id} xs={12} sm={6} md={4}>
            <Card style={{ borderRadius: '15px', height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={listing.image}
                alt={listing.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {listing.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {listing.description}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Ownership: {listing.ownership}%
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Price: {listing.price}
                </Typography>
                <LinearProgress variant="determinate" value={listing.ownership} style={{ borderRadius: '5px' }} />
                <Button
                  color="primary"
                  component={Link}
                  to={`/listing/${listing.id}`}
                  style={{ marginTop: '10px', borderRadius: '10px' }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
