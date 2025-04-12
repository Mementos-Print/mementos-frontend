// api/authService.ts
import axios from 'axios';
import { LoginRequest } from '../types/auth';
import { toast } from 'react-toastify';

// const API_BASE_URL = import.meta.env.API_BASE_URL

export const AdminLogin = async (userData: LoginRequest) => {
  try {
    const { email, password } = userData;
    
    if (!email?.trim() || !password?.trim()) {
      toast.error('Please provide both email and password');
      throw new Error('Missing credentials');
    }

    const response = await axios.post(
      `https://mementos-backend.onrender.com/staff/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const token = response.data?.token || 
                 response.data?.accessToken || 
                 response.data?.data?.token;

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