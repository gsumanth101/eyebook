import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, Button } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { sales } from 'data/sales';
import SaleCard from './SaleCard';
import { getUniversityCount, getStudentCount, getSpocCount, getCourseCount } from 'api/api';

const Sales = () => {
  const [universityCount, setUniversityCount] = useState<string>('0');
  const [studentCount, setStudentCount] = useState<string>('0');
  const [spocCount, setSpocCount] = useState<string>('0');
  const [courseCount, setCourseCount] = useState<string>('0');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [universityCount, studentCount, spocCount, courseCount] = await Promise.all([
          getUniversityCount(),
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
        <Button variant="outlined" startIcon={<IconifyIcon icon="solar:upload-linear" />}>
          Export
        </Button>
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

export default Sales;
