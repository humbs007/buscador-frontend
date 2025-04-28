import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-buscador.hsgomes.services/api/v1', // URL real do seu backend com HTTPS!
  timeout: 10000,
});

// Buscar tabelas disponíveis
export const getTables = async () => {
  const response = await api.get('/tables');
  return response.data;
};

// Buscar campos indexados de uma tabela
export const getFields = async (tableName) => {
  const response = await api.get(`/tables/${tableName}/fields`);
  return response.data;
};

// Buscar Fonte (tabela específica)
export const searchFonte = async (params) => {
  const response = await api.post('/search/fonte', params);
  return response.data;
};

// Exportar resultado para CSV
export const exportSearchCSV = async (params) => {
  const response = await api.post('/search/fonte/export/csv', params, {
    responseType: 'blob',
  });
  return response.data;
};

// Exportar resultado para XLSX
export const exportSearchXLSX = async (params) => {
  const response = await api.post('/search/fonte/export/xlsx', params, {
    responseType: 'blob',
  });
  return response.data;
};

export default api;
