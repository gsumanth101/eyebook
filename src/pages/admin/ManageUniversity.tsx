import React from 'react';
import Universities from './partials/Universities';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUniversity = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', overflow: 'hidden', padding: 0, margin: 0 }}
    >
      <Grid item xs={12} sm={10} md={8} lg={12}>
        <Card style={{ padding: '40px', maxWidth: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Manage Universities
            </Typography>
            <div className="px-0 sm:px-5 lg:px-8 py-8 w-full max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Universities />
              </div>
            </div>
            <ToastContainer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManageUniversity;
