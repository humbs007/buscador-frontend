import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultTabs from './ResultTabs';
import {
  Box, Button, MenuItem, Select, TextField, InputLabel, FormControl, Typography
} from '@mui/material';

const FIELD_LABELS = {
  "PN_CPF": "CPF (ENEL)",
  "PN_CNPJ": "CNPJ (ENEL)",
  "CPF": "CPF",
  "CONSUMO": "Consumo (META)",
  "CELULAR1": "Celular 1",
  "TEL_FIXO1": "Telefone Fixo 1",
  "NOME": "Nome Completo",
  "NOME_MAE": "Nome da Mãe",
  "DT_NASCIMENTO": "Data de Nascimento",
  "RENDA_PRESUMIDA": "Renda Presumida"
};

const mapLabel = (field) => FIELD_LABELS[field] || field.replace(/_/g, ' ').toUpperCase();

export default function SearchForm() {
  const [tables, setTables] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [operator, setOperator] = useState('=');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/metadata/')
      .then(res => {
        const tableList = Object.keys(res.data.tables);
        setTables(tableList);
      });
  }, []);

  useEffect(() => {
    if (selectedTable) {
      axios.get('http://localhost:8000/metadata/')
        .then(res => {
          const fieldsRaw = res.data.tables[selectedTable];
          setFields(fieldsRaw || []);
        });
    }
  }, [selectedTable]);

  const handleSearch = (option) => {
    const payload = option === 'option1'
      ? {
          tables: selectedTable === "TODAS" ? ["table_enel", "table_meta", "table_credlink"] : [selectedTable],
          field: selectedField,
          operator,
          term
        }
      : { number: term };

    axios.post(`http://localhost:8000/search/${option}`, payload)
      .then(res => setResults(res.data.results))
      .catch(err => console.error('[SEARCH ERROR]', err));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>🔎 Buscador Multi Dados</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tabela</InputLabel>
        <Select value={selectedTable} label="Tabela" onChange={e => setSelectedTable(e.target.value)}>
          {tables.map((table, idx) => (
            <MenuItem key={idx} value={table}>{table.replace("table_", "").toUpperCase()}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Campo</InputLabel>
        <Select value={selectedField} label="Campo" onChange={e => setSelectedField(e.target.value)}>
          {fields.map((field, idx) => (
            <MenuItem key={idx} value={field}>{mapLabel(field)}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operador</InputLabel>
        <Select value={operator} label="Operador" onChange={e => setOperator(e.target.value)}>
          {['=', '!=', '>', '<', '>=', '<='].map((op, idx) => (
            <MenuItem key={idx} value={op}>{op}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField fullWidth label="Valor da Busca" value={term} onChange={e => setTerm(e.target.value)} sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => handleSearch('option1')}>Pesquisar Opção 1</Button>
        <Button variant="outlined" onClick={() => handleSearch('option2')}>Pesquisar Geral</Button>
      </Box>

      {results && <ResultTabs data={results} />}
    </Box>
  );
}
