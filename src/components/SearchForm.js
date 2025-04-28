import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, CircularProgress, Stack } from '@mui/material';
import { getTables, getFields } from '../services/api';
import { formatCpfCnpj } from '../utils/masks';

function SearchForm({ onSearch }) {
  const [tables, setTables] = useState([]);
  const [fields, setFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(false);

  const [formData, setFormData] = useState({
    table_name: '',
    field: '',
    operator: '=',
    term: ''
  });

  useEffect(() => {
    async function loadTables() {
      const tablesList = await getTables();
      setTables(tablesList.data);
    }
    loadTables();
  }, []);

  useEffect(() => {
    async function loadFields() {
      if (formData.table_name) {
        setLoadingFields(true);
        const fieldsList = await getFields(formData.table_name);
        setFields(fieldsList.data);
        setLoadingFields(false);
      }
    }
    loadFields();
  }, [formData.table_name]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const formattedTerm = formatCpfCnpj(formData.term);
    onSearch({ ...formData, term: formattedTerm });
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Tabela</InputLabel>
          <Select name="table_name" value={formData.table_name} onChange={handleChange}>
            {tables.map((table) => (
              <MenuItem key={table.value} value={table.value}>{table.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!fields.length || loadingFields}>
          <InputLabel>Campo</InputLabel>
          <Select name="field" value={formData.field} onChange={handleChange}>
            {fields.map((field) => (
              <MenuItem key={field} value={field}>{field}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Operador</InputLabel>
          <Select name="operator" value={formData.operator} onChange={handleChange}>
            <MenuItem value="=">=</MenuItem>
            <MenuItem value=">">{'>'}</MenuItem>
            <MenuItem value="<">{'<'}</MenuItem>
            <MenuItem value=">=">{'>='}</MenuItem>
            <MenuItem value="<=">{'<='}</MenuItem>
          </Select>
        </FormControl>

        <TextField 
          name="term" 
          label="Termo de Busca" 
          fullWidth 
          value={formData.term} 
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" onClick={handleSearch}>
          {loadingFields ? <CircularProgress size={24} /> : "Buscar"}
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchForm;
