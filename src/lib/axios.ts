import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mementos-backend.onrender.com',
  withCredentials: true,
});

export default api;