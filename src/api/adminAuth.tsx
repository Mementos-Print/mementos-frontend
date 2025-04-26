// api/authService.ts
import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';
import { toast } from 'react-toastify';
import api from '../lib/axios';

// const API_BASE_URL = import.meta.env.API_BASE_URL

export const AdminLogin = async (userData: LoginRequest) => {
  try {
    const { email, password } = userData;

    if (!email?.trim() || !password?.trim()) {
      toast.error('Please provide both email and password');
      throw new Error('Missing credentials');
    }

    // const response = await axios.post(
    //   `"https://mementos-backend.onrender.com/staff/login`,
    //   { email, password },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );

    const response = await api.post<LoginResponse>(
      '/staff/login',
      { email, password }
    );

    const token = response.data?.accessToken
    if (!token) {
      console.error('Login response:', response.data);
      throw new Error('No authentication token received');
    }
    toast.success('Login successful');
    return token;
  } catch (error) {
    let errorMessage = 'Login failed';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;

      // Handle specific HTTP status codes
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 404) {
        errorMessage = 'Staff login endpoint not found';
      }
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const refreshToken = async (setToken?: (token: string) => void) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('No auth token found in localStorage');
    throw new Error('No auth token found');
  }

  try {
    const response = await api.post('/tokens/refreshStaff', {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true // Important for cookies
    });

    console.log('Token refreshed:', response.data);

    const newToken = response.data.token || response.data.accessToken;
    if (!newToken) {
      throw new Error('No token received in refresh response');
    }

    localStorage.setItem('refreshToken', newToken);
    if (setToken) {
      setToken(newToken);
    }

    return newToken;
  } catch (error: any) {
    console.error('Token refresh failed:', error.response?.data || error.message);
    throw error;
  }
};

// STAFF LOGOUT
export const logoutStaff = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('No auth token found in localStorage');
    throw new Error('No auth token found');
  }

  try {
    await api.delete('/tokens/logoutStaff', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    localStorage.removeItem('authToken');
    toast.success('Staff logged out');
  } catch (error: any) {
    console.error('Staff logout failed:', error.response?.data || error.message);
    toast.error('Staff logout failed');
    throw error;
  }
};

// FETCH IMAGES (Admin gallery)
export const fetchAdminImages = async () => {
  try {
    const response = await api.get('/images/gallery');
    return response.data; 
  } catch (error: any) {
    console.error('Fetching images failed:', error.response?.data || error.message);
    toast.error('Fetching images failed');
    throw error;
  }
};

// DELETE IMAGE(S)
export const deleteImages = async (imageIDs: string | string[]) => {
  try {
    const payload = {
      imageID: Array.isArray(imageIDs) ? imageIDs : [imageIDs],
    };

    const response = await api.delete('/images/delete', {
      data: payload,
    });

    toast.success('Image(s) deleted successfully');
    return response.data;
  } catch (error: any) {
    console.error('Deleting image(s) failed:', error.response?.data || error.message);
    toast.error('Deleting image(s) failed');
    throw error;
  }
};