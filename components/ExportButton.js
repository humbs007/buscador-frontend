// frontend/components/ExportButton.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { getFieldLabel, getTableLabel } from '../lib/db_schema_config';
import { saveAs } from 'file-saver';

export default function ExportButton({ results }) {
  const handleExport = () => {
    Object.entries(results).forEach(([tableName, records]) => {
      if (!records || records.length === 0) return;

      const columns = Object.keys(records[0]);

      // 🏷️ Cabeçalhos com labels amigáveis
      const friendlyHeaders = columns
        .map((col) => `"${getFieldLabel(tableName, col)}"`)
        .join(',');

      const rows = records.map((row) =>
        columns
          .map((col) => `"${String(row[col] ?? '').replace(/"/g, '""')}"`)
          .join(',')
      );

      const csv = [friendlyHeaders, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const fileName = `${getTableLabel(tableName)}.csv`;

      saveAs(blob, fileName);
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
