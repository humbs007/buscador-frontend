import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, TextField, InputLabel,
  FormControl, CircularProgress, Typography,
  Alert, MenuItem, Select, IconButton, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import ResultCards from './ResultCards';
import ResultTable from './ResultTable';
import ExportButton from './ExportButton';
import { getTableLabel, getFieldLabel, getUnifiedFields } from '../lib/db_schema_config';
import { logInfo, logError } from '../lib/logger';

export default function SearchForm() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [fields, setFields] = useState([]);
  const [filters, setFilters] = useState([{ logic: null, field: '', operator: '=', value: '' }]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('cards');

  const getTables = async (attempt = 1) => {
    try {
      const res = await axios.get('/api/v1/tables');
      const all = res.data.tables || [];
      const filtered = all.filter(name =>
        !name.includes('vidatoda') &&
        !name.includes('plano_saude') &&
        !name.includes('meta')
      );
      setTables(['TODAS', ...filtered]);
      logInfo('Tabelas carregadas com sucesso', filtered);
    } catch (err) {
      logError(`Erro tentativa ${attempt} ao carregar tabelas`, err);
      if (attempt < 3) {
        setTimeout(() => getTables(attempt + 1), 500 * attempt);
      } else {
        setTables(['TODAS']);
        setError('Erro ao carregar as tabelas. Retente mais tarde.');
      }
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  useEffect(() => {
    if (!selectedTable) {
      setFields([]);
      setFilters([{ logic: null, field: '', operator: '=', value: '' }]);
      return;
    }

    const url = selectedTable === 'TODAS'
      ? '/api/v1/tables/fields/comuns'
      : `/api/v1/tables/${selectedTable}/fields`;

    axios.get(url)
      .then(res => {
        const baseFields = res.data.fields || [];
        setFields(baseFields);
        logInfo(`Campos carregados para ${selectedTable}`, baseFields);
        setFilters([{ logic: null, field: '', operator: '=', value: '' }]);
      })
      .catch(err => {
        setError('Erro ao carregar campos.');
        logError(`Erro ao carregar campos da tabela ${selectedTable}`, err);
      });
  }, [selectedTable]);

  const resolveMappedFields = (field) => getUnifiedFields(field);

  const handleAddFilter = () => {
    setFilters([...filters, { logic: 'AND', field: '', operator: '=', value: '' }]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters.length ? newFilters : [{ logic: null, field: '', operator: '=', value: '' }]);
  };

  const handleFilterChange = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
  };

  const handleSearch = () => {
    const validFilters = filters.filter(f => f.field && f.value !== '');

    if (!selectedTable || validFilters.length === 0) {
      setError('Tabela ou filtros inválidos.');
      return;
    }

    const payloadFilters = validFilters.map((f, i) => {
      const mapped = resolveMappedFields(f.field);
      if (!mapped || mapped.length === 0) {
        logError(`Campo '${f.field}' não tem mapeamento válido em UNIFIED_FIELDS`);
      }
      return {
        logic: i === 0 ? null : f.logic,
        fields: mapped,
        operator: f.operator,
        term: f.value
      };
    });

    setIsLoading(true);
    setError('');
    setResults(null);

    axios.post('/api/v1/search/advanced', {
      tables: selectedTable === 'TODAS'
        ? tables.filter(t => t !== 'TODAS')
        : [selectedTable],
      filters: payloadFilters
    })
      .then(res => {
        setResults(res.data.results || {});
        logInfo('Busca avançada retornou resultados', res.data.results);
      })
      .catch(err => {
        setError('Erro ao buscar dados.');
        logError('Erro ao buscar dados avançados', err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>🔎 Busca Avançada</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tabela</InputLabel>
        <Select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
          {tables.map((table, idx) => (
            <MenuItem key={idx} value={table}>{getTableLabel(table)}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {filters.map((filter, index) => (
        <Box key={index} sx={{ mb: 2, display: 'flex', gap: 1 }}>
          {index > 0 && (
            <FormControl sx={{ width: 100 }}>
              <Select
                value={filter.logic}
                onChange={e => handleFilterChange(index, 'logic', e.target.value)}
              >
                <MenuItem value="AND">E</MenuItem>
                <MenuItem value="OR">OU</MenuItem>
              </Select>
            </FormControl>
          )}

          <Autocomplete
            options={fields}
            getOptionLabel={(field) => getFieldLabel(selectedTable, field)}
            isOptionEqualToValue={(option, value) => option === value}
            value={fields.includes(filter.field) ? filter.field : null}
            onChange={(e, newValue) => handleFilterChange(index, 'field', newValue)}
            renderInput={(params) => <TextField {...params} label="Campo" />}
            fullWidth
          />

          <FormControl sx={{ width: 100 }}>
            <Select
              value={filter.operator}
              onChange={e => handleFilterChange(index, 'operator', e.target.value)}
            >
              {['=', '!=', '>=', '<=', '>', '<', 'like'].map((op, i) => (
                <MenuItem key={i} value={op}>{op}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Valor"
            value={filter.value}
            onChange={e => handleFilterChange(index, 'value', e.target.value)}
            fullWidth
          />

          <IconButton onClick={() => handleRemoveFilter(index)} color="error">
            <RemoveCircleOutline />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={handleAddFilter}
        sx={{ mb: 2 }}
        startIcon={<AddCircleOutline />}
      >
        Adicionar Filtro
      </Button>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={filters.length === 0 || isLoading}
        >
          Buscar
        </Button>

        {results && typeof results === 'object' && <ExportButton results={results} />}
      </Box>

      {results && (
        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => newMode && setViewMode(newMode)}
          >
            <ToggleButton value="cards">🧾 Cards</ToggleButton>
            <ToggleButton value="table">📊 Tabela</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {results && typeof results === 'object' && (
        viewMode === 'cards'
          ? <ResultCards data={results} />
          : <ResultTable data={results} />
      )}
    </Box>
  );
}
