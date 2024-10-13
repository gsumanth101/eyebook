/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { postDataToBackend } from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUniversity: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    long_name: '',
    short_name: '',
    location: '',
    country: '',
    spoc_name: '',
    spoc_email: '',
    spoc_phone: '',
    spoc_password: '',
  });

  // Handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      const response = (await postDataToBackend('admin/add_org', formData)) as { message: string };
      toast.success(response.message);
      setFormData({
        long_name: '',
        short_name: '',
        location: '',
        country: '',
        spoc_name: '',
        spoc_email: '',
        spoc_phone: '',
        spoc_password: '',
      }); // Clear form
    } catch (error) {
      toast.error('Error creating university: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', overflow: 'hidden', padding: 0, margin: 0 }}
    >
      <Grid item xs={12} sm={10} md={8} lg={10}>
        <Card style={{ padding: '100px', maxWidth: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Add University
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Long Name"
                    name="long_name"
                    value={formData.long_name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Short Name"
                    name="short_name"
                    value={formData.short_name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="SPOC Name"
                    name="spoc_name"
                    value={formData.spoc_name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="SPOC Email"
                    name="spoc_email"
                    value={formData.spoc_email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="SPOC Phone"
                    name="spoc_phone"
                    value={formData.spoc_phone}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="SPOC Password"
                    name="spoc_password"
                    type="password"
                    value={formData.spoc_password}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    {loading ? 'Creating...' : 'Create University'}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <ToastContainer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddUniversity;