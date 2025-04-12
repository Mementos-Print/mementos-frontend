import axios from 'axios';
import { toast } from 'react-toastify';
import { LoginResponse } from '../types/auth'
interface UserData {
  name: string;
  email: string;
}

export const loginUser = async (userData: UserData) => {
  try {
    const { email, name } = userData;

    if (!email?.trim() || !name?.trim()) {
      toast.error('Please provide both email and name');
      throw new Error('Missing credentials');
    }

    const response = await axios.post<LoginResponse>(
      'https://mementos-backend.onrender.com/users/loginUser',
      { email, name }
    );

    const token = response.data?.accessToken

    if (!token) {
      console.error('Login response:', response.data);
      throw new Error('No authentication token received');
    }

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
    const response = await axios.post(
      'https://mementos-backend.onrender.com/tokens/refreshUser',
      { authToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
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

export const uploadBlankImages = async (files: File[], borderColor: string = 'black') => {
  try {
    const formData = new FormData();
    formData.append('borderColor', borderColor);

    // Assuming files is an array of File objects
    files.forEach((file: File) => {
      formData.append('images', file);
    });

    const authToken = localStorage.getItem('authToken');

    const response = await axios.post(
      'https://mementos-backend.onrender.com/images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log('PostCard uploaded:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Upload failed:', error.response?.data || error.message);
    throw error;
  }
};

export const uploadPolaroidImages = async (file: File, borderColor: string = 'black') => {
  try {
    const formData = new FormData();
    formData.append('borderColor', borderColor);
    formData.append('images', file);

    const authToken = localStorage.getItem('authToken');

    const response = await axios.post(
      'https://mementos-backend.onrender.com/images/uploadPolaroid',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log('Polaroid uploaded:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Polaroid upload failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const authToken = localStorage.getItem('authToken');

    const response = await axios.delete(
      'https://mementos-backend.onrender.com/tokens/logoutUser',
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log('Logout successful');
    return response.data;
  } catch (error: any) {
    console.error('Logout failed:', error.response?.data || error.message);
    throw error;
  }
};