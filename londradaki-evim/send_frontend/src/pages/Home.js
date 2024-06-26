import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, LinearProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';
import image1 from '../pictures/1.jpeg'; // İlk resmi import et
import image2 from '../pictures/2.jpeg'; // İkinci resmi import et
import image3 from '../pictures/3.jpeg'; // Üçüncü resmi import et

const listings = [
  {
    id: 1,
    title: 'Modern Apartment in London',
    images: [
      image1, // Dışarıdan görünüm
      image2, // İçeriden görünüm 1
      image3  // İçeriden görünüm 2
    ],
    description: 'A beautiful modern apartment in the heart of London.',
    ownership: 75,
    price: '£500,000'
  }
];

const Home = () => {
  return (
    <div className="home">
      <Container maxWidth="lg" className="content">
        <Typography variant="h4" gutterBottom>
          Satın Almaya Hazır Evler
        </Typography>
        <Grid container spacing={4}>
          {listings.map(listing => (
            <Grid item key={listing.id} xs={12} sm={6} md={4}>
              <Card style={{ borderRadius: '15px', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={listing.images[0]} // İlk görseli kullanıyoruz
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
    </div>
  );
};

export default Home;
