import React, { useState } from 'react';
import { postDataToBackend } from '../../api/api'; // Import API functions
import { Grid, Card, CardContent, Typography, Button, TextField, FormControl } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const FacultyBulkUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [universityId, setUniversityId] = useState<string>('');
  const [loading, setLoading] = useState(false); // Spinner state

  // Fetch universities on component mount

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle university change

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !universityId) {
      toast.error('Please select a file and a university.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    // formData.append('universityId', universityId);

    setLoading(true); // Show spinner
    try {
      const response = await postDataToBackend(
        'admin/upload_faculty',
        Object.fromEntries(formData.entries()),
      );
      if (response && typeof response.message === 'string') {
        toast.success(response.message);
      } else {
        toast.error('Unexpected response format');
      }
      setFile(null);
      setUniversityId('');
    } catch (error) {
      toast.error('Error uploading users: ' + (error.response?.data?.message || error.message));
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
      <Grid item xs={12} sm={10} md={8} lg={12}>
        <Card style={{ padding: '40px', maxWidth: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Bulk Upload Users
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* <FormControl fullWidth margin="normal">
                <InputLabel>Select University</InputLabel>
                <Select value={universityId} onChange={handleUniversityChange} required>
                  <MenuItem value="">
                    <em>Select a university</em>
                  </MenuItem>
                  {universities.map((university) => (
                    <MenuItem key={university._id} value={university._id}>
                      {university.long_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <FormControl fullWidth margin="normal">
                <TextField
                  type="file"
                  onChange={handleFileChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Uploading...' : 'Upload Users'}
              </Button>
            </form>
            <ToastContainer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FacultyBulkUpload;
