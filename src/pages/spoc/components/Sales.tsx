import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, Button, Menu, MenuItem } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { sales } from 'data/sales';
import SaleCard from './SaleCard';
import { getUniversityData, getStudentCount, getSpocCount, getCourseCount } from 'api/api';
import axios from 'axios'; // Import axios for making HTTP requests

const SpocSales = () => {
  const [universityCount, setUniversityCount] = useState<string>('0');
  const [studentCount, setStudentCount] = useState<string>('0');
  const [spocCount, setSpocCount] = useState<string>('0');
  const [courseCount, setCourseCount] = useState<string>('0');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [universityCount, studentCount, spocCount, courseCount] = await Promise.all([
          getUniversityData(),
          getStudentCount(),
          getSpocCount(),
          getCourseCount(),
        ]);

        console.log('University Count:', universityCount);
        console.log('Student Count:', studentCount);
        console.log('SPOC Count:', spocCount);
        console.log('Course Count:', courseCount);

        setUniversityCount(universityCount.toString());
        setStudentCount(studentCount.toString());
        setSpocCount(spocCount.toString());
        setCourseCount(courseCount.toString());
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (type: string) => {
    handleClose();
    try {
      let endpoint = '';
      switch (type) {
        case 'Student':
          endpoint = 'admin/export_students';
          break;
        case 'Faculty':
          endpoint = 'admin/export_faculty';
          break;
        case 'SPOC':
          endpoint = 'admin/export_spocs';
          break;
        default:
          return;
      }

      const response = await axios.get(endpoint, { responseType: 'blob' }); // Set response type to blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_data.xlsx`); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Failed to export ${type}:`, error);
    }
  };

  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5.375}>
        <div>
          <Typography variant="h4" mb={0.5}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="primary.lighter">
            Counts
          </Typography>
        </div>
        <div>
          <Button
            variant="outlined"
            startIcon={<IconifyIcon icon="solar:upload-linear" />}
            onClick={handleClick}
          >
            Export
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleMenuItemClick('Student')}>Student</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Faculty')}>Faculty</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('SPOC')}>SPOC</MenuItem>
          </Menu>
        </div>
      </Stack>

      <Grid container spacing={{ xs: 3.875, xl: 2 }} columns={{ xs: 1, sm: 2, md: 4 }}>
        {sales.map((item) => (
          <Grid item xs={1} key={item.label}>
            <SaleCard
              item={item}
              value={
                item.label === 'Universities'
                  ? universityCount
                  : item.label === 'Students'
                    ? studentCount
                    : item.label === 'SPOCs'
                      ? spocCount
                      : item.label === 'Courses'
                        ? courseCount
                        : item.value
              }
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default SpocSales;
