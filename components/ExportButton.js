import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';
import { saveAs } from 'file-saver';

export default function ExportButton({ results }) {
  const handleExport = () => {
    Object.entries(results).forEach(([tableName, records]) => {
      if (!records || !records.length) return;

      const columns = Object.keys(records[0]);
      const friendlyHeaders = columns.map(col => `"${getFriendlyLabel(tableName, col)}"`).join(',');

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
