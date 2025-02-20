import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Translation endpoints
export const translateText = async (data) => {
  const response = await api.post('/api/translate/', data);
  return response.data;
};
