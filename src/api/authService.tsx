// api/authService.ts
import axios from 'axios';
import { LoginRequest, LoginResponse, ApiError } from '../types/auth';

// const API_BASE_URL = import.meta.env.API_BASE_URL

export const AdminLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `https://mementos-backend.onrender.com/staff/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as ApiError;
      throw new Error(serverError.message || 'Login failed');
    }
    throw new Error('Network error');
  }
};