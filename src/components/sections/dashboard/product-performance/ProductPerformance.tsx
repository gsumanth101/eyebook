import React, { useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getUniversityData } from 'api/api';
// import CustomPagination from 'components/common/CustomPagination';
// import SearchFilter from 'components/common/SearchFilter';

interface UniversityData {
  id: string;
  long_name: string;
  short_name: string;
  location: string;
  country: string;
}

const ProductPerformance: React.FC = () => {
  const [universities, setUniversities] = useState<UniversityData[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getUniversityData();
        console.log('Fetched data:', response); // Debugging log
        if (response && Array.isArray(response)) {
          setUniversities(response);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const columns: GridColDef[] = [
    { field: 'long_name', headerName: 'Long Name', flex: 1.5, minWidth: 200 },
    { field: 'short_name', headerName: 'Short Name', flex: 1.5, minWidth: 200 },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 150 },
    { field: 'country', headerName: 'Country', flex: 1, minWidth: 150 },
  ];

  const rows = universities.map((university) => ({
    id: university.id,
    long_name: university.long_name,
    short_name: university.short_name,
    location: university.location,
    country: university.country,
  }));

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ md: 'row' }}
        rowGap={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography variant="h4" color="primary.dark">
          University Data
        </Typography>

        {/* <SearchFilter sx={{ maxWidth: 350 }} apiRef={getUniversityData} /> */}
      </Stack>

      <Box
        sx={{
          height: 400,
          width: 1,
          mt: 3,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Box>
      {/* <CustomPagination apiRef={getUniversityData} /> */}
    </Paper>
  );
};

export default ProductPerformance;
