import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { getTableLabel, getFieldLabel } from '../lib/db_schema_config';
import { saveAs } from 'file-saver';

export default function ExportButton({ results }) {
  const handleExport = () => {
    if (!results || typeof results !== 'object') return;

    Object.entries(results).forEach(([tableName, records]) => {
      if (!Array.isArray(records) || records.length === 0) return;

      const columns = Object.keys(records[0]);
      const friendlyHeaders = columns
        .map(col => `"${getFieldLabel(tableName, col)}"`).join(',');

      const rows = records.map(row =>
        columns.map(col => `"${String(row[col] ?? '').replace(/"/g, '""')}"`).join(',')
      );

      const csvContent = [friendlyHeaders, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      saveAs(blob, `${getTableLabel(tableName)}.csv`);
    });
  };

  return (
    <Button variant="outlined" onClick={handleExport} sx={{ mt: 1 }}>
      Exportar Resultados
    </Button>
  );
}

ExportButton.propTypes = {
  results: PropTypes.object.isRequired
};
