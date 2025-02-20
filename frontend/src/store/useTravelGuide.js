import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getTransportRoutes = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/get-transport-routes/`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDestinationSuggestions = async (preferences) => {
  try {
    const response = await axios.post(`${API_URL}/travel-suggestions/`, preferences);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch suggestions');
  }
};