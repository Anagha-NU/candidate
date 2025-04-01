import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/candidates',
});

export default {
  getAll: () => api.get('/'),
  create: (data) => api.post('/add', data),
  get: (id) => api.get(`/${id}`),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`)
};