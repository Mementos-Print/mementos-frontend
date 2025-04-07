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
    
    if (!name || !email) {
      toast.error('Please provide both name and email');
      throw new Error('Missing credentials');
    }

    const response = await axios.post<LoginResponse>(
      'https://mementos-backend.onrender.com/users/loginUser',
      { email, name }
    );

    const { token } = response.data;
    const authToken = token;

    if (!authToken) {
      throw new Error('No authentication token received');
    }

    return authToken;
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'Something went wrong';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw error;
  }
};

export  const refreshToken = async () => {
    try {
      const response = await axios.post(
        'https://mementos-backend.onrender.com/tokens/refreshUser'
      );
      console.log('Token refreshed:', response.data);
      return response.data;
    } catch (error:  any) {
      console.error('Token refresh failed:', error.response?.data || error.message);
      throw error;
    }
  };

export  const uploadBlankImages = async (files: File[], borderColor: string = 'black') => {
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
      console.log('Images uploaded:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Upload failed:', error.response?.data || error.message);
      throw error;
    }
  };

export  const uploadPolaroidImages = async (file: File, borderColor: string = 'black') => {
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