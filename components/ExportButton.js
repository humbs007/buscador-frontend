// frontend/components/ExportButton.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';
import { saveAs } from 'file-saver';

export default function ExportButton({ data }) {
  const handleExport = () => {
    if (!data || typeof data !== 'object') return;

    Object.entries(data).forEach(([tableName, records]) => {
      if (!records || !records.length) return;

      const columns = Object.keys(records[0]);
      const friendlyCols = columns.map(col => `"${getFriendlyLabel(tableName, col)}"`).join(',');
      const rows = records.map(row =>
        columns.map(col => `"${String(row[col] ?? '').replace(/"/g, '""')}"`).join(',')
      );
      const csvContent = [friendlyCols, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const filename = `${getTableLabel(tableName)}.csv`;

      saveAs(blob, filename);
    });
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleExport} sx={{ mt: 2 }}>
      Exportar Resultados
    </Button>
  );
}

ExportButton.propTypes = {
  data: PropTypes.object.isRequired
};
