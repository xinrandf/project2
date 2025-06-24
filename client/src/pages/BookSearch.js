import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider,
  Chip
} from '@mui/material';
import axios from 'axios';

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [amazonPrice, setAmazonPrice] = useState(null);
  const [amazonLoading, setAmazonLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    
      const response = await axios.get(`/api/books/search?query=${searchQuery}`);
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error('Error searching', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateScanCost = (price) => {
    if (!price) return 0;
    return (price * 0.05).toFixed(2); //  5
  };

  const handleBookSelect = async (book) => {
    setSelectedBook(book);
    setAmazonLoading(true);
    
    try {
      
      const isbn = book.volumeInfo.industryIdentifiers?.find(
        id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
      )?.identifier;
      
      if (isbn) {
        // Amazon 
        const response = await axios.get(`/api/books/amazon-price?isbn=${isbn}`);
        setAmazonPrice(response.data);
      } else {
        setAmazonPrice(null);
      }
    } catch (error) {
      console.error('Error fetching Amazon price:', error);
      setAmazonPrice(null);
    } finally {
      setAmazonLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pet Search
      </Typography>
      
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Search for pets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ height: '100%' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {selectedBook && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Selected Pet
            </Typography>
            <Typography variant="body1">
              Name: {selectedBook.volumeInfo.title}
            </Typography>
            <Typography variant="body1">
              Breed: {selectedBook.volumeInfo.authors?.join(', ')}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
               Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Google : ${selectedBook.saleInfo?.listPrice?.amount || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {amazonLoading ? (
                  <CircularProgress size={20} />
                ) : amazonPrice ? (
                  <Typography variant="body1">
                    elsewhere: ${amazonPrice?.SearchResult?.Items?.[0]?.Offers?.Listings?.[0]?.Price?.Amount || 'N/A'}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                     Not available
                  </Typography>
                )}
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Estimated Cost: ${calculateScanCost(selectedBook.saleInfo?.listPrice?.amount)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {/* Handle order */}}
            >
              Order Scan
            </Button>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By: {book.volumeInfo.authors?.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${book.saleInfo?.listPrice?.amount || 'N/A'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleBookSelect(book)}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookSearch;

 