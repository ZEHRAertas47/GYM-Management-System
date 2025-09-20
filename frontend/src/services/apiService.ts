import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Sadece gerçek 401 hatalarında login'e yönlendir
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/')) {
      console.log('Unauthorized access, redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Members
  getMembers: () => apiClient.get('/members'),
  getMember: (id: number) => apiClient.get(`/members/${id}`),
  createMember: (data: any) => apiClient.post('/members', data),
  updateMember: (id: number, data: any) => apiClient.put(`/members/${id}`, data),
  deleteMember: (id: number) => apiClient.delete(`/members/${id}`),

  // Trainers
  getTrainers: () => apiClient.get('/trainers'),
  getTrainer: (id: number) => apiClient.get(`/trainers/${id}`),
  createTrainer: (data: any) => apiClient.post('/trainers', data),
  updateTrainer: (id: number, data: any) => apiClient.put(`/trainers/${id}`, data),
  deleteTrainer: (id: number) => apiClient.delete(`/trainers/${id}`),

  // Equipment
  getEquipment: () => apiClient.get('/equipment'),
  getEquipmentItem: (id: number) => apiClient.get(`/equipment/${id}`),
  createEquipment: (data: any) => apiClient.post('/equipment', data),
  updateEquipment: (id: number, data: any) => apiClient.put(`/equipment/${id}`, data),
  deleteEquipment: (id: number) => apiClient.delete(`/equipment/${id}`),

  // Membership Plans
  getMembershipPlans: () => apiClient.get('/membership-plans'),
  getMembershipPlan: (id: number) => apiClient.get(`/membership-plans/${id}`),
  createMembershipPlan: (data: any) => apiClient.post('/membership-plans', data),
  updateMembershipPlan: (id: number, data: any) => apiClient.put(`/membership-plans/${id}`, data),
  deleteMembershipPlan: (id: number) => apiClient.delete(`/membership-plans/${id}`),
};