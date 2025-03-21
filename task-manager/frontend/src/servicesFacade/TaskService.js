import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const TaskService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data;
  },

  update: async (id, task) => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default TaskService;
