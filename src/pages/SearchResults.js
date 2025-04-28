import React, { useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import SearchForm from '../components/SearchForm';
import ResultTabs from '../components/ResultTabs';
import ToastNotification from '../components/ToastNotification';
import { searchFonte } from '../services/api';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleSearch = async (params) => {
    try {
      setLoading(true);
      const response = await searchFonte(params);
      setResults(response.data);
      setToast({ open: true, message: "Busca realizada com sucesso!", severity: "success" });
    } catch (error) {
      setToast({ open: true, message: "Erro na busca", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Busca Avançada
      </Typography>

      <SearchForm onSearch={handleSearch} />

      {loading && (
        <Container sx={{ textAlign: 'center', mt: 5 }}>
          <CircularProgress />
        </Container>
      )}

      {!loading && results.length > 0 && (
        <ResultTabs results={results} />
      )}

      <ToastNotification 
        open={toast.open} 
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </Container>
  );
}

export default SearchResults;
