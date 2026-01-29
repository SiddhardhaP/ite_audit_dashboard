// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // The address of your FastAPI backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
