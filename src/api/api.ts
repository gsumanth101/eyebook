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
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginRequest),
  });

  // Log the response for debugging
  console.log('Response:', response);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } else {
    const text = await response.text();
    throw new Error(`Unexpected response: ${text}`);
  }
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

  // Log the response for debugging
  console.log('Response:', response);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to fetch profile');
    }
  } else {
    const text = await response.text();
    throw new Error(`Unexpected response: ${text}`);
  }
};

export const postDataToBackend = async (
  endpoint: string,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Log the response for debugging
  console.log('Response:', response);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || 'Failed to post data');
    }
  } else {
    const text = await response.text();
    throw new Error(`Unexpected response: ${text}`);
  }
};

export const getDataFromBackend = async (endpoint: string): Promise<Record<string, unknown>> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

  // Log the response for debugging
  console.log('Response:', response);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || 'Failed to fetch data');
    }
  } else {
    const text = await response.text();
    throw new Error(`Unexpected response: ${text}`);
  }
};

export const logout = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if using session-based authentication
    });

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      if (response.ok) {
        // Clear any client-side authentication data (e.g., tokens)
        localStorage.removeItem('token');
        // sessionStorage.removeItem('authToken');
        // Redirect to the login page
        window.location.href = '/';
      } else {
        throw new Error(responseData.message || 'Failed to log out');
      }
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
