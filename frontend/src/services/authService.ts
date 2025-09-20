import axios from 'axios';

const API_URL = 'http://localhost:8888/api/auth';

export const authService = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/signin`, {
      username,
      password
    });
    return response.data;
  },

  register: async (userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  }
};