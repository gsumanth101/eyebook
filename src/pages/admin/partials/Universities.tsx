import React, { useEffect, useState } from 'react';
import { getDataFromBackend } from '../../../api/api';
import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Universities: React.FC = () => {
  interface University {
    _id: string;
    long_name: string;
    short_name: string;
    location: string;
    country: string;
  }

  const [universities, setUniversities] = useState<University[]>([]);

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

  const columns: GridColDef[] = [
    { field: 'long_name', headerName: 'Long Name', flex: 1 },
    { field: 'short_name', headerName: 'Short Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'country', headerName: 'Country', flex: 1, align: 'center', headerAlign: 'center' },
  ];

  const rows = universities.map((university) => ({
    id: university._id,
    long_name: university.long_name,
    short_name: university.short_name,
    location: university.location,
    country: university.country,
  }));

  return (
    <div className="col-span-full xl:col-span-10 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Universities</h2>
      </header>
      <div className="p-3">
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Universities;
