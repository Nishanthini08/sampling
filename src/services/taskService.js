import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const taskService = {
  getAllTasks: (page = 0, size = 5, title = '', status = '') => {
    let url = `${API_BASE_URL}?page=${page}&size=${size}`;
    if (title) url += `&title=${encodeURIComponent(title)}`;
    if (status && status !== 'ALL') url += `&status=${status}`;
    return axios.get(url);
  },

  createTask: (task) => {
    return axios.post(API_BASE_URL, task);
  },

  updateTask: (id, task) => {
    return axios.put(`${API_BASE_URL}/${id}`, task);
  },

  deleteTask: (id) => {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
};

export default taskService;
