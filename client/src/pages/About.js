import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import TargetIcon from '@mui/icons-material/TrackChanges';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const About = () => {
  const objectives = [
    {
      text: 'Build a responsive and secure web application focused on pets and adoption..',
      icon: <SpeedIcon color="primary" />,
    },
    {
      text: 'pet lovers who want to share experiences, tips, and pet photos.',
      icon: <LibraryBooksIcon color="primary" />,
    },
    {
      text: 'Animal shelters and rescue organizations looking to list adoptable pets.',
      icon: <IntegrationInstructionsIcon color="primary" />,
    },
    {
      text: 'individuals interested in adopting pets or learning more about pet care.',
      icon: <SecurityIcon color="primary" />,
    },
    {
      text: 'Community members who wish to support pet welfare initiatives.',
      icon: <TargetIcon color="primary" />,
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
          About PetPal
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              PetPals is a full-stack web application designed to connect pet lovers, pet owners, and potential adopters through a responsive and interactive platform. The app will feature a blog space for users to share stories, tips, and photos of their pets, alongside a product-style catalog that lists pets available for adoption. 


            </Typography>
            <Typography variant="body1" paragraph>
              The platform aims to foster community engagement while supporting pet adoption efforts.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Goals and Objectives
            </Typography>
            <List>
              {objectives.map((objective, index) => (
                <ListItem key={index} sx={{ py: 2 }}>
                  <ListItemIcon>
                    {objective.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={objective.text}
                    sx={{ '& .MuiListItemText-primary': { fontSize: '1.1rem' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 