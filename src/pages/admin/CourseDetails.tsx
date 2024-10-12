import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';
import { getDataFromBackend, postDataToBackend, postFormDataToBackend } from '../../api/api';

interface Course {
  _id: string;
  name: string;
  description: string;
  universities: University[];
  content: Unit[];
}

interface Unit {
  unitTitle: string;
  materials: Material[];
}

interface Material {
  indexPath: string;
}

interface University {
  _id: string;
  long_name: string;
  description: string;
  location: string;
}

function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<string>('details');
  const [unitName, setUnitName] = useState<string>('');
  const [scormFile, setScormFile] = useState<File | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseDetails = async () => {
    try {
      const response = await getDataFromBackend(`admin/courses/${courseId}`);
      if (response && response.course) {
        setCourseDetails(response.course as Course);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      setError('Error fetching course details.');
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await getDataFromBackend(`admin/org`);
      if (response && response.universities) {
        setUniversities(response.universities as University[]);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      setError('Error fetching universities.');
      console.error('Error fetching universities:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchUniversities();
  }, [courseId]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setScormFile(event.target.files[0]);
    }
  };

  const handleAddUnit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('unitName', unitName);
    formData.append('scormFile', scormFile as Blob);

    try {
      const result = await postFormDataToBackend(`admin/courses/${courseId}/add-unit`, formData);
      console.log('Unit added successfully:', result);
      alert('Unit added successfully!');
      fetchCourseDetails();
    } catch (error) {
      console.error('Error uploading unit:', error);
    }
  };

  const handleAssignCourse = async (): Promise<void> => {
    try {
      if (!selectedUniversity) {
        alert('Please select a university.');
        return;
      }

      console.log(`Assigning course ID: ${courseId} to university ID: ${selectedUniversity}`);

      const data = await postDataToBackend(`admin/courses/${courseId}/assign`, {
        universityId: selectedUniversity,
      });

      console.log('Course assigned successfully', data);
      alert('Course assigned successfully!');

      const assignedUniversity = universities.find((u) => u._id === selectedUniversity);
      if (!assignedUniversity) {
        alert('Selected university not found.');
        return;
      }

      setCourseDetails((prevDetails) => {
        if (!prevDetails) {
          return null;
        }
        return {
          ...prevDetails,
          universities: [...prevDetails.universities, assignedUniversity],
        };
      });
    } catch (error) {
      console.error('Error assigning course:', error);
      alert('Error assigning course: ' + (error as Error).message);
    }
  };

  const renderDetails = () => {
    if (!courseDetails) return null;

    return (
      <Box mt={4}>
        <Typography variant="h6">Course Details</Typography>
        <Typography variant="body1">{courseDetails.description}</Typography>
        <Typography variant="h6" mt={4}>
          Assigned Universities
        </Typography>
        <List>
          {courseDetails.universities &&
            courseDetails.universities.map((university: University) => (
              <ListItem key={university._id}>
                <ListItemText primary={university.long_name} secondary={university.location} />
              </ListItem>
            ))}
        </List>
        <Typography variant="h6" mt={4}>
          Units
        </Typography>
        <List>
          {courseDetails.content &&
            courseDetails.content.map((unit, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={unit.unitTitle}
                  secondary={
                    <List>
                      {unit.materials &&
                        unit.materials.map((material, idx) => (
                          <ListItem key={idx}>
                            {material.indexPath ? (
                              <Link
                                href={`http://localhost:4000/api/${material.indexPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Unit
                              </Link>
                            ) : null}
                          </ListItem>
                        ))}
                    </List>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
    );
  };

  const renderAddUnit = () => (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Add Unit
      </Typography>
      <form onSubmit={handleAddUnit}>
        <TextField
          id="unitName"
          label="Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="scormFile"
          type="file"
          onChange={handleFileChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        {scormFile && <Typography variant="body2">{scormFile.name}</Typography>}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Add Unit
          </Button>
        </Box>
      </form>
    </Paper>
  );

  const renderUniversities = () => (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Assign Course to Universities
      </Typography>
      <TextField
        id="university"
        select
        label="Select University"
        value={selectedUniversity}
        onChange={(e) => setSelectedUniversity(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">
          <em>Select a university</em>
        </MenuItem>
        {universities.map((university) => (
          <MenuItem key={university._id} value={university._id}>
            {university.long_name}
          </MenuItem>
        ))}
      </TextField>
      <Box mt={2}>
        <Button onClick={handleAssignCourse} variant="contained" color="primary">
          Assign Course
        </Button>
      </Box>
    </Paper>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {courseDetails?.name}
        </Typography>
        <Typography variant="body1">{courseDetails?.description}</Typography>
        <Box mt={4}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Details" value="details" />
            <Tab label="Add Unit" value="addUnit" />
            <Tab label="Assign to Universities" value="universities" />
          </Tabs>
          <Box mt={2}>
            {activeTab === 'details' && renderDetails()}
            {activeTab === 'addUnit' && renderAddUnit()}
            {activeTab === 'universities' && renderUniversities()}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CourseDetails;
