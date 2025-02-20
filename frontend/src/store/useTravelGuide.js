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
    const response = await fetch('http://localhost:5000/api/v1/travel/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};