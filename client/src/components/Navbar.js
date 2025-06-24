import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a1a' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#4CAF50',
              fontWeight: 'bold',
              '&:hover': {
                color: '#66BB6A'
              }
            }}
          >
            PetPal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/pricing"
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Pricing
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/about"
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              About
            </Button>
            {user ? (
              <>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ 
                    ml: 2,
                    color: '#4CAF50'
                  }}
                >
                  {user.name}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ 
                    ml: 1,
                    color: '#fff',
                    borderColor: '#fff',
                    '&:hover': {
                      borderColor: '#4CAF50',
                      color: '#4CAF50',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)'
                    }
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{ 
                    ml: 2,
                    color: '#fff',
                    borderColor: '#fff',
                    '&:hover': {
                      borderColor: '#4CAF50',
                      color: '#4CAF50',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)'
                    }
                  }}
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ 
                    ml: 1,
                    bgcolor: '#4CAF50',
                    '&:hover': {
                      bgcolor: '#66BB6A'
                    }
                  }}
                  component={RouterLink}
                  to="/register"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 