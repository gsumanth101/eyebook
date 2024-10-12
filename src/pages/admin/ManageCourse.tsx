import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataFromBackend } from '../../api/api';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import paths from '../../routes/paths';

// Import the Course type
// src/types.ts

export interface University {
  _id: string;
  long_name: string;
  // Add other fields as necessary
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  universities: University[];
  // Add other fields as necessary
}

const ManageCourse = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getDataFromBackend('admin/courses');
        if (response && Array.isArray(response.courses)) {
          setCourses(response.courses);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        if (error.message === 'Invalid token') {
          toast.error('Error creating course: Invalid token.');
        } else {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseId: string) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter((id) => id !== courseId)
        : [...prevSelectedCourses, courseId],
    );
  };

  const handleViewClick = (courseId: string) => {
    navigate(paths.course_details(courseId));
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
              Courses
            </Typography>
            <Box mt={4}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Select</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Universities</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course._id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedCourses.includes(course._id)}
                            onChange={() => handleCheckboxChange(course._id)}
                          />
                        </TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>
                          {course.universities.map((university: University) => (
                            <div key={university._id}>{university.long_name}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => handleViewClick(course._id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <ToastContainer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManageCourse;
