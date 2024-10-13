import React, { useState, ChangeEvent, FormEvent } from 'react';
import { postDataToBackend } from '../../api/api'; // Import API functions
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'; // Import Material-UI components

interface FormData {
  name: string;
  description: string;
}

const AddCourse: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false); // Spinner state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
  });

  // Handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      const response = (await postDataToBackend(
        'admin/add_course',
        formData as unknown as Record<string, unknown>,
      )) as { message: string };
      toast.success(response.message);
      setFormData({ name: '', description: '' }); // Clear form
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error('Error creating course: ' + error.message);
      }
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Create Course
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Course Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} // Disable button while loading
                style={{ marginTop: '16px' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Course'}
              </Button>
            </form>
            <ToastContainer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddCourse;
