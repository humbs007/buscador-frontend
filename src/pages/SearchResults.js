import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchForm from '../components/SearchForm';
import ResultTabs from '../components/ResultTabs';
import { searchFonte } from '../services/api';

function SearchResults() {
  const [results, setResults] = useState([]);

  const handleSearch = async (params) => {
    const response = await searchFonte(params);
    setResults(response.data);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Busca Avançada
      </Typography>

      <SearchForm onSearch={handleSearch} />

      {results.length > 0 && (
        <ResultTabs results={results} />
      )}
    </Container>
  );
}

export default SearchResults;
