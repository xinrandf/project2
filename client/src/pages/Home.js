import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  CircularProgress,
  Paper
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&key=AIzaSyDlMemY0nGy_coIIyYR804RKLtI2vbqnuw&maxResults=10`
      );
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateScanCost = (pageCount) => {
    if (!pageCount) return '0.00';
    return ((pageCount / 100)).toFixed(2);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          PetPal
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          find your next pet friends
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Search for books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="large"
              sx={{ '& .MuiInputBase-root': { height: '56px' } }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ height: '56px' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{
                  height: 250,
                  objectFit: 'contain',
                  p: 2,
                  bgcolor: 'grey.50'
                }}
                image={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'}
                alt={book.volumeInfo.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="h2" sx={{ fontWeight: 'bold' }}>
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Author: {book.volumeInfo.authors?.join(', ') || 'Unknown'}
                </Typography>
                <Typography variant="body2" paragraph>
                  Page count: {book.volumeInfo.pageCount || 'N/A'}
                </Typography>
                <Typography variant="body2" paragraph>
                  Published: {book.volumeInfo.publishedDate?.split('-')[0] || 'N/A'}
                </Typography>
                <Typography variant="body2" paragraph>
                  Format: {book.volumeInfo.printType === 'BOOK' ? 'Hardcover' : book.volumeInfo.printType}
                </Typography>
                <Typography variant="body2" paragraph>
                  Publisher: {book.volumeInfo.publisher || 'N/A'}
                </Typography>
                <Typography variant="body2" paragraph>
                  Language: {book.volumeInfo.language?.toUpperCase() || 'N/A'}
                </Typography>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    mt: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    If you digitalize it now
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#FFD700',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    ${calculateScanCost(book.volumeInfo.pageCount)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ 
                      mt: 1,
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.100'
                      }
                    }}
                    onClick={() => {/* Handle order */}}
                  >
                    Meet Now
                  </Button>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!user && !searchResults.length && (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            Create an account to get started
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home; 