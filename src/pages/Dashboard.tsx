import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

interface Item {
  _id: string;
  name: string;
  category: string;
  location: string;
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Windsurf Gear
        </Typography>
        <Button variant="contained" color="primary">
          Add New Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {item.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Category: {item.category}
                </Typography>
                <Typography color="textSecondary">
                  Location: {item.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {items.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          No items found. Start by adding your first windsurf gear!
        </Typography>
      )}
    </Box>
  );
}
