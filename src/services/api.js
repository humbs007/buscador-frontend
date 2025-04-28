import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1'
});

// Chamada para exportar CSV
export const exportSearchCSV = async (searchData) => {
  const response = await api.post('/search/fonte/export/csv', searchData, {
    responseType: 'blob' // ⚡ importantíssimo: tratar como arquivo
  });
  return response.data;
};

// Chamada para exportar XLSX
export const exportSearchXLSX = async (searchData) => {
  const response = await api.post('/search/fonte/export/xlsx', searchData, {
    responseType: 'blob'
  });
  return response.data;
};

export default api;
