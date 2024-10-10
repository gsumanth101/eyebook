import React, { useState, useEffect } from 'react';
import { getDataFromBackend, postDataToBackend } from '../../api/api'; // Import API functions
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const BulkUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [universityId, setUniversityId] = useState<string>('');
  const [universities, setUniversities] = useState<{ _id: string; long_name: string }[]>([]);
  const [loading, setLoading] = useState(false); // Spinner state

  // Fetch universities on component mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getDataFromBackend('admin/org');
        if (response && Array.isArray(response.universities)) {
          setUniversities(response.universities);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle university change
  const handleUniversityChange = (e: SelectChangeEvent<string>) => {
    setUniversityId(e.target.value as string);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !universityId) {
      toast.error('Please select a file and a university.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('universityId', universityId);

    setLoading(true); // Show spinner
    try {
      const response = await postDataToBackend('/upload-users', Object.fromEntries(formData));
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
              <FormControl fullWidth margin="normal">
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
              </FormControl>
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

export default BulkUpload;
