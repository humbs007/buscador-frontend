// frontend/lib/api.js

import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const searchOption1 = async ({ tables, field, operator, term }) => {
  try {
    const res = await axios.post(`${API_BASE}/search/option1`, {
      tables,
      field,
      operator,
      term,
    });
    return res.data.results;
  } catch (err) {
    console.error('[API] Erro em Option1:', err);
    return null;
  }
};

export const searchOption2 = async (term) => {
  try {
    const res = await axios.post(`${API_BASE}/search/option2`, {
      number: term,
    });
    return res.data.results;
  } catch (err) {
    console.error('[API] Erro em Option2:', err);
    return null;
  }
};

export const fetchMetadata = async () => {
  try {
    const res = await axios.get(`${API_BASE}/metadata`);
    return res.data.tables || {};
  } catch (err) {
    console.error('[API] Erro ao buscar metadados:', err);
    return {};
  }
};
