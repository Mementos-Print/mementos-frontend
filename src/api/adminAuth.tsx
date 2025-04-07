// api/authService.ts
import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';
import { toast } from 'react-toastify';

// const API_BASE_URL = import.meta.env.API_BASE_URL

export const AdminLogin = async (userData: LoginRequest) => {
  try {
    const { email, password } = userData;
    
    if (!password || !email) {
      toast.error('Please provide both password and email');
      throw new Error('Missing credentials');
    }

    const response = await axios.post<LoginResponse>(
      `https://mementos-backend.onrender.com/staff/login`,
      userData,
    );

    if (!response.data.token) {
      throw new Error('No authentication token received');
    }

    return response.data.token;
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
