import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ title, price, perSet, features, isPopular, buttonText }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      ...(isPopular && {
        border: '2px solid #4CAF50',
        transform: 'scale(1.05)',
      }),
    }}
  >
    {isPopular && (
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <StarIcon />
        <Typography variant="subtitle2">Most Popular</Typography>
      </Box>
    )}
    <CardContent sx={{ flexGrow: 1, pt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
          ${price}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          per set
        </Typography>
      </Box>
      <List>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
      </List>
      <Button
        variant={isPopular ? "contained" : "outlined"}
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Platinum",
      price: "1.00",
      features: [
        "100 pages = $1",
        "Scan up to 10 books monthly",
        "Free delivery",
        "24/7 customer service",
        "Priority service (2 business days)",
      ],
      isPopular: true,
      buttonText: "Choose Platinum",
    },
    {
      title: "Platinum Lite",
      price: "1.50",
      features: [
        "100 pages = $1.50",
        "Scan up to 5 books monthly",
        "Standard delivery",
        "Business hours support",
        "3 business days processing",
      ],
      isPopular: false,
      buttonText: "Choose Platinum Lite",
    },
    {
      title: "One-time Order",
      price: "2.00",
      features: [
        "100 pages = $2",
        "No monthly commitment",
        "Standard delivery",
        "Email support",
        "5 business days processing",
      ],
      isPopular: false,
      buttonText: "Order Now",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Pricing
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Choose the perfect plan for your needs
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {plans.map((plan, index) => (
          <Grid item key={index} xs={12} md={4}>
            <PricingCard {...plan} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing; 