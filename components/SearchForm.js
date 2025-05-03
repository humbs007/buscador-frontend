import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, MenuItem, Select, TextField,
  InputLabel, FormControl, CircularProgress,
  Typography, Alert
} from '@mui/material';
import ResultTabs from './ResultTabs';
import ExportButton from './ExportButton';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';
import { logInfo, logError } from '../lib/logger';

const FIELD_MAPPINGS_TODAS = {
  'CPF/CNPJ': ['CPF', 'CNPJ', 'PN_CPF', 'PN_CNPJ'],
  'UF Geral': ['UF', 'PN_UF', 'ESTADO'],
  'Bairro Geral': ['BAIRRO', 'Distrito', 'OL_Bairro_ObjLig'],
  'CONSUMOS META': ['CONSUMO1','CONSUMO2','CONSUMO3','CONSUMO4','CONSUMO5','CONSUMO6','CONSUMO7','CONSUMO8','CONSUMO9','CONSUMO10']
};

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
        logInfo('Tabelas carregadas com sucesso', data);
      })
      .catch(err => {
        setError('Erro ao carregar as tabelas.');
        logError('Erro ao carregar tabelas', err);
      });
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const url = selectedTable === 'TODAS'
        ? '/api/v1/tables/fields/comuns'
        : `/api/v1/tables/${selectedTable}/fields`;

      setSelectedField('');
      setFields([]);

      axios.get(url)
        .then(res => {
          let baseFields = res.data.fields || [];

          if (selectedTable === 'TODAS' || selectedTable === 'table_meta') {
            baseFields = [
              ...baseFields,
              ...Object.keys(FIELD_MAPPINGS_TODAS)
            ];
          }

          const uniqueFields = [...new Set(baseFields)];
          setFields(uniqueFields);
          logInfo(`Campos carregados para ${selectedTable}`, uniqueFields);
        })
        .catch(err => {
          setError('Erro ao carregar campos.');
          logError(`Erro ao carregar campos da tabela ${selectedTable}`, err);
        });
    } else {
      setFields([]);
      setSelectedField('');
    }
  }, [selectedTable]);

  const resolveMappedFields = (field) => {
    return FIELD_MAPPINGS_TODAS[field] || [field];
  };

  const handleSearch = (type) => {
    if (!term || (type === 'fonte' && (!selectedTable || !selectedField))) return;

    setIsLoading(true);
    setError('');
    setResults(null);

    const endpoint = type === 'fonte'
      ? '/api/v1/search/option1'
      : '/api/v1/search/option2';

    const mappedFields = resolveMappedFields(selectedField);

    const payload = type === 'fonte'
      ? {
          tables: selectedTable === 'TODAS'
            ? ['table_credlink', 'table_enel', 'table_meta']
            : [selectedTable],
          field: mappedFields[0], // 🔁 apenas o primeiro para consulta direta
          operator,
          term
        }
      : { number: term };

    axios.post(endpoint, payload)
      .then(res => {
        setResults(res.data.results);
        logInfo(`Busca ${type === 'fonte' ? 'por fonte' : 'geral'} retornou resultados`, res.data.results);
      })
      .catch(err => {
        setError('Erro ao buscar dados.');
        logError(`Erro ao buscar dados (${type})`, err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>🔎 Busca Inteligente</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tabela</InputLabel>
        <Select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
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
          onChange={e => setSelectedField(e.target.value)}
          disabled={fields.length === 0}
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
        <Select value={operator} onChange={e => setOperator(e.target.value)}>
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
          disabled={!selectedTable || !selectedField || !term || isLoading}
        >
          Buscar por Fonte
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleSearch('geral')}
          disabled={!term || isLoading}
        >
          Buscar Geral
        </Button>
        {results && <ExportButton results={results} />}
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {results && <ResultTabs data={results} />}
    </Box>
  );
}
