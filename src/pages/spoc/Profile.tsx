import React, { useState, useEffect } from 'react';
import { getSpocProfile } from '../../api/api';
// import { updatePassword } from '../../api/api';
import { Box, Grid, Typography, TextField, Button, Avatar, Paper, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import LockIcon from '@mui/icons-material/Lock';

interface User {
  name: string;
  email: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#6b46c1', // Purple
    },
    background: {
      default: '#f5f5f5', // Light gray
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const SpocProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getSpocProfile();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }

    try {
      setPasswordError(null);
      // await updatePassword(currentPassword, newPassword);
      setPasswordSuccess('Password updated successfully!');
    } catch (err) {
      setPasswordError('Failed to update password. Try again.');
    }
  };

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
      >
        <Paper
          elevation={4}
          sx={{
            padding: '2rem',
            maxWidth: 500,
            width: '100%',
            borderRadius: '10px',
          }}
        >
          <Box textAlign="center" mb={3}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
              {/* <LockIcon /> */}
            </Avatar>
            <Typography variant="h5" fontWeight="bold" mt={2}>
              Profile
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your account information
            </Typography>
          </Box>

          {user && (
            <Box mb={4}>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Name
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Typography variant="h6" mb={2}>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {passwordError && <Alert severity="error">{passwordError}</Alert>}
            {passwordSuccess && <Alert severity="success">{passwordSuccess}</Alert>}

            <Button
              onClick={handlePasswordChange}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Change Password
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default SpocProfile;
