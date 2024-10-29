import axios from 'axios';

// Define the base URL for the API
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',  // Update with your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const toursApi = {
  async getTour(id: string) {
    const response = await apiClient.get(`/tours/${id}/`);
    return response;
  },

  async getAllTours() {
    const response = await apiClient.get('/tours/');
    return response;
  },
  // Add other tour-related API functions here if needed
};
