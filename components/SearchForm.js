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
  'CPF/CNPJ': ['CPF', 'PN_CPF', 'CNPJ', 'PN_CNPJ', 'cpf', 'cnpj', 'CNPJ_EMPRESA'],
  'UF Geral': ['UF', 'PN_UF', 'ESTADO', 'UF_EMPRESA', 'cnpj_uf'],
  'CIDADE Geral': ['CIDADE', 'Cidade', 'MUNICIPIO_EMPRESA', 'OL_Municipio_ObjLig'],
  'Bairro Geral': ['BAIRRO', 'Distrito', 'OL_Bairro_ObjLig'],
  'CONSUMOS META': [
    'CONSUMO1', 'CONSUMO2', 'CONSUMO3', 'CONSUMO4', 'CONSUMO5',
    'CONSUMO6', 'CONSUMO7', 'CONSUMO8', 'CONSUMO9', 'CONSUMO10'
  ]
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
    if (!selectedTable) {
      setFields([]);
      setSelectedField('');
      return;
    }

    const url = selectedTable === 'TODAS'
      ? '/api/v1/tables/fields/comuns'
      : `/api/v1/tables/${selectedTable}/fields`;

    setSelectedField('');
    setFields([]);

    axios.get(url)
      .then(res => {
        let baseFields = res.data.fields || [];

        if (selectedTable === 'TODAS') {
          const excludedFields = new Set(Object.values(FIELD_MAPPINGS_TODAS).flat());
          const cleanedFields = baseFields.filter(field => !excludedFields.has(field));
          const unifiedFields = Object.keys(FIELD_MAPPINGS_TODAS);
          const merged = [...unifiedFields, ...cleanedFields];
          setFields(merged);
        } else if (selectedTable === 'table_meta') {
          const unifiedFields = ['CONSUMOS META'];
          const excluded = new Set(FIELD_MAPPINGS_TODAS['CONSUMOS META']);
          const cleanedFields = baseFields.filter(field => !excluded.has(field));
          setFields([...unifiedFields, ...cleanedFields]);
        } else {
          setFields([...new Set(baseFields)]);
        }

        logInfo(`Campos carregados para ${selectedTable}`, baseFields);
      })
      .catch(err => {
        setError('Erro ao carregar campos.');
        logError(`Erro ao carregar campos da tabela ${selectedTable}`, err);
      });
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
            ? tables.filter(t => t !== 'TODAS')
            : [selectedTable],
          fields: mappedFields,  // 🔥 envia todos os campos
          operator,
          term
        }
      : { number: term };

    if (type === 'geral') {
      setSelectedTable('TODAS');
    }

    axios.post(endpoint, payload)
      .then(res => {
        const data = res.data.results;
        if (Array.isArray(data)) {
          setResults({ anonymous: data });
        } else {
          setResults(data);
        }
        logInfo(`Busca ${type === 'fonte' ? 'por fonte' : 'geral'} retornou resultados`, data);
      })
      .catch(err => {
        setError('Erro ao buscar dados.');
        logError(`Erro ao buscar dados (${type})`, err);
      })
      .finally(() => setIsLoading(false));
  };

  const isValidField = fields.includes(selectedField);

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
          value={isValidField ? selectedField : ''}
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

        {selectedTable !== 'TODAS' && (
          <Button
            variant="outlined"
            onClick={() => handleSearch('geral')}
            disabled={!term || isLoading}
          >
            Buscar Geral
          </Button>
        )}

        {results && typeof results === 'object' && <ExportButton results={results} />}
      </Box>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {results && typeof results === 'object' && <ResultTabs data={results} />}
    </Box>
  );
}
