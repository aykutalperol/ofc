import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const listings = [
  {
    id: 1,
    title: 'Modern Apartment in London',
    price: '£500,000',
    tax: '£50,000',
    fees: '£10,000',
    total: '£560,000'
  },
  {
    id: 2,
    title: 'Spacious House in the Suburbs',
    price: '£750,000',
    tax: '£75,000',
    fees: '£15,000',
    total: '£840,000'
  },
  {
    id: 3,
    title: 'Cozy Cottage by the Lake',
    price: '£300,000',
    tax: '£30,000',
    fees: '£5,000',
    total: '£335,000'
  }
];

const Purchase = () => {
  const { id } = useParams();
  const listing = listings.find(l => l.id === parseInt(id));

  if (!listing) {
    return <Typography variant="h6">Listing not found</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Purchase Summary
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {listing.title}
          </Typography>
          <Typography variant="body2" color="textPrimary" paragraph>
            Price: {listing.price}
          </Typography>
          <Typography variant="body2" color="textPrimary" paragraph>
            Tax: {listing.tax}
          </Typography>
          <Typography variant="body2" color="textPrimary" paragraph>
            Fees: {listing.fees}
          </Typography>
          <Typography variant="h6" color="textPrimary" paragraph>
            Total: {listing.total}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Purchase;
