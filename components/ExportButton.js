// frontend/src/components/ExportButton.js
import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

function ExportButton({ data, filename = "resultado" }) {
  const exportToExcel = () => {
    Object.keys(data).forEach((table) => {
      const ws = XLSX.utils.json_to_sheet(data[table]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, table);
      XLSX.writeFile(wb, `${filename}_${table}.xlsx`);
    });
  };

  const exportToCSV = () => {
    Object.keys(data).forEach((table) => {
      const ws = XLSX.utils.json_to_sheet(data[table]);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}_${table}.csv`;
      link.click();
    });
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={exportToExcel} style={{ marginRight: '10px' }}>
        Exportar para XLSX
      </Button>
      <Button variant="outlined" color="warning" onClick={exportToCSV}>
        Exportar para CSV
      </Button>
    </>
  );
}

export default ExportButton;
