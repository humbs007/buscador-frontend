import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Alert
} from '@mui/material';
import ResultTabs from './ResultTabs';
import ExportButton from './ExportButton';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';

export default function SearchForm() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [operator, setOperator] = useState('=');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/v1/tables')
      .then(res => {
        const data = res.data.tables || [];
        setTables(['TODAS', ...data]);
      })
      .catch(err => {
        setError('Erro ao carregar as tabelas.');
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (selectedTable) {
      if (selectedTable === 'TODAS') {
        axios.get('/api/v1/tables/fields/comuns')
          .then(res => setFields(res.data.fields))
          .catch(err => {
            setError('Erro ao carregar campos comuns.');
            console.error(err);
          });
      } else {
        axios.get(`/api/v1/tables/${selectedTable}/fields`)
          .then(res => setFields(res.data.fields))
          .catch(err => {
            setError('Erro ao carregar campos.');
            console.error(err);
          });
      }
    } else {
      setFields([]);
    }
  }, [selectedTable]);

  const handleSearch = (option) => {
    if (!selectedField || !term) return;
    setIsLoading(true);
    setError('');
    setResults(null);

    const payload = option === 'fonte'
      ? { table_name: selectedTable, field: selectedField, operator, term }
      : { term };

    const endpoint = option === 'fonte'
      ? '/api/v1/search/fonte'
      : '/api/v1/search/geral';

    axios.post(endpoint, payload)
      .then(res => setResults(res.data.results))
      .catch(err => {
        setError('Erro ao buscar dados. Verifique os parâmetros.');
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Busca Inteligente</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tabela</InputLabel>
        <Select
          value={selectedTable}
          label="Tabela"
          onChange={e => setSelectedTable(e.target.value)}
        >
          {tables.map((table, idx) => (
            <MenuItem key={idx} value={table}>
              {getTableLabel(table)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Campo</InputLabel>
        <Select
          value={selectedField}
          label="Campo"
          onChange={e => setSelectedField(e.target.value)}
        >
          {fields.map((field, idx) => (
            <MenuItem key={idx} value={field}>
              {getFriendlyLabel(selectedTable, field)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operador</InputLabel>
        <Select
          value={operator}
          label="Operador"
          onChange={e => setOperator(e.target.value)}
        >
          {['=', '!=', '>=', '<=', '>', '<'].map((op, idx) => (
            <MenuItem key={idx} value={op}>{op}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Valor da Busca"
        value={term}
        onChange={e => setTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleSearch('fonte')}
          disabled={isLoading || !selectedTable || !selectedField || !term}
        >
          Pesquisar Fonte
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleSearch('geral')}
          disabled={isLoading || !term}
        >
          Pesquisar Geral
        </Button>
        {results && (
          <ExportButton results={results} />
        )}
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {results && <ResultTabs data={results} />}
    </Box>
  );
}
