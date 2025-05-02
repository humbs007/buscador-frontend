// frontend/components/ExportButton.js
import React from 'react';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';

export default function ExportButton({ data }) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'resultados.json');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Exportar Resultados
    </Button>
  );
}
