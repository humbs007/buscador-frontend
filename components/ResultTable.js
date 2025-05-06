// 📁 components/ResultTable.js

import React from 'react';
import {
  Box, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, Paper
} from '@mui/material';
import { getTableLabel, getFieldLabel } from '../lib/db_schema_config';

export default function ResultTable({ data }) {
  if (!data || typeof data !== 'object') return null;

  return (
    <Box sx={{ mt: 2 }}>
      {Object.entries(data).map(([tableName, records]) => {
        if (!records.length) return null;
        const columns = Object.keys(records[0]);

        return (
          <Box key={tableName} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              🗂️ {getTableLabel(tableName)}
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columns.map((col, i) => (
                      <TableCell key={i}>{getFieldLabel(tableName, col)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((row, idx) => (
                    <TableRow key={idx}>
                      {columns.map((col, i) => (
                        <TableCell key={i}>
                          {String(row[col] ?? '').substring(0, 50)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Box>
  );
}
