import axios from 'axios';

// Define or import the ProductPerformanceData type
interface UniversityData {
  id: string;
  long_name: string;
  short_name: string;
  location: string;
  country: string;
}

const API_BASE_URL = 'http://localhost:4000/api';

interface LoginResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface ProfileResponse {
  name: string;
  email: string;
  // Add other fields as needed
}

export const adminLogin = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, loginRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const spocLogin = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/spoc/login`, loginRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const getSpocProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spoc/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const postDataToBackend = async (
  endpoint: string,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to post data:', error);
    throw new Error(error.response?.data?.message || 'Failed to post data');
  }
};

export const getUnitData = async (courseId: string, unitId: string): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/courses/${courseId}/units/${unitId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch unit data:', error);
    throw new Error('Failed to fetch unit data');
  }
};

export const postFormDataToBackend = async (
  endpoint: string,
  formData: FormData,
): Promise<Record<string, unknown>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to post form data:', error);
    throw new Error(error.response?.data?.message || 'Failed to post form data');
  }
};

export const getDataFromBackend = async (endpoint: string): Promise<Record<string, unknown>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch data');
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await axios.post(
      '/api/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies if using session-based authentication
      },
    );

    if (response.status === 200) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      throw new Error(response.data.message || 'Failed to log out');
    }
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const getUniversityCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/university_count`);
    return response.data.count;
  } catch (error) {
    console.error('Failed to fetch university count:', error);
    throw new Error('Failed to fetch university count');
  }
};

export const getStudentCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/student_count`);
    return response.data.count;
  } catch (error) {
    console.error('Failed to fetch student count:', error);
    throw new Error('Failed to fetch student count');
  }
};

export const getSpocCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/spoc_count`);
    return response.data.count;
  } catch (error) {
    console.error('Failed to fetch SPOC count:', error);
    throw new Error('Failed to fetch SPOC count');
  }
};

export const getCourseCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/course_count`);
    return response.data.count;
  } catch (error) {
    console.error('Failed to fetch course count:', error);
    throw new Error('Failed to fetch course count');
  }
};

export const getUniversityData = async (): Promise<UniversityData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spoc/student_count`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch university data:', error);
    throw new Error('Failed to fetch university data');
  }
};
