import React from 'react';
import { Button, Stack } from '@mui/material';
import { exportSearchCSV, exportSearchXLSX } from '../services/api';

const ExportButtons = ({ searchParams }) => {

  const handleExport = async (format) => {
    try {
      let fileData;
      if (format === 'csv') {
        fileData = await exportSearchCSV(searchParams);
      } else if (format === 'xlsx') {
        fileData = await exportSearchXLSX(searchParams);
      }

      const blob = new Blob([fileData], {
        type: format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `export.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao exportar:", error);
      alert("Falha ao exportar arquivo.");
    }
  };

  return (
    <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
      <Button variant="outlined" color="primary" onClick={() => handleExport('csv')}>
        Exportar CSV
      </Button>
      <Button variant="contained" color="success" onClick={() => handleExport('xlsx')}>
        Exportar XLSX
      </Button>
    </Stack>
  );
};

export default ExportButtons;
