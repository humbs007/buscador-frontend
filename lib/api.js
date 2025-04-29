// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',  // 🚀 Muda se for renderizar em nuvem depois
});

export default api;
