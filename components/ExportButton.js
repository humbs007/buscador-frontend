import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Menu, MenuItem, CircularProgress
} from '@mui/material';
import { saveAs } from 'file-saver';
import { getTableLabel } from '../lib/db_schema_config';
import { getFriendlyLabel } from '../lib/friendlyLabel'; // ✅ novo import

export default function ExportButton({ results }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const exportSingleCSV = () => {
    setLoading(true);
    try {
      const allRows = [];
      const allHeadersSet = new Set();

      Object.entries(results).forEach(([tableName, records]) => {
        records.forEach((row) => {
          const rowWithSource = { ...row, Fonte: getTableLabel(tableName) };
          Object.keys(rowWithSource).forEach(k => allHeadersSet.add(k));
          allRows.push(rowWithSource);
        });
      });

      const allHeaders = Array.from(allHeadersSet);
      const headerLine = allHeaders.map(col => `"${getFriendlyLabel(null, col)}"`).join(',');

      const dataLines = allRows.map(row =>
        allHeaders.map(col =>
          `"${String(row[col] ?? '').replace(/"/g, '""')}"`
        ).join(',')
      );

      const csv = [headerLine, ...dataLines].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'resultado_consolidado.csv');
    } catch (err) {
      alert('Erro ao exportar dados.');
      console.error('[Export CSV Consolidado] Falhou:', err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const exportPerTable = () => {
    setLoading(true);
    try {
      Object.entries(results).forEach(([tableName, records]) => {
        if (!records || records.length === 0) return;

        const columns = Object.keys(records[0]);
        const friendlyHeaders = columns
          .map(col => `"${getFriendlyLabel(tableName, col)}"`).join(',');

        const rows = records.map(row =>
          columns.map(col => `"${String(row[col] ?? '').replace(/"/g, '""')}"`).join(',')
        );

        const csv = [friendlyHeaders, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const fileName = `${getTableLabel(tableName)}.csv`;
        saveAs(blob, fileName);
      });
    } catch (err) {
      alert('Erro ao exportar arquivos separados.');
      console.error('[Export CSV por fonte] Falhou:', err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        disabled={loading}
        sx={{ mt: 1 }}
      >
        Exportar...
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={exportPerTable}>CSV (um por fonte)</MenuItem>
        <MenuItem onClick={exportSingleCSV}>CSV (único consolidado)</MenuItem>
      </Menu>
      {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
    </>
  );
}

ExportButton.propTypes = {
  results: PropTypes.object.isRequired
};
