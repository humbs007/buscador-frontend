import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Tab, Tabs, Table, TableHead, TableRow,
  TableCell, TableBody, Typography
} from '@mui/material';
import { getTableLabel, getFieldLabel } from '../lib/db_schema_config';

export default function ResultTabs({ data }) {
  const [tabIndex, setTabIndex] = useState(0);
  const tableNames = Object.keys(data || {});

  if (tableNames.length === 0) {
    return <Typography variant="body1" sx={{ mt: 2 }}>Nenhum resultado encontrado.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tableNames.map((table, idx) => (
          <Tab key={idx} label={getTableLabel(table)} />
        ))}
      </Tabs>

      {tableNames.map((table, idx) => (
        <Box key={idx} hidden={tabIndex !== idx} sx={{ mt: 2 }}>
          {tabIndex === idx && (
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(data[table][0] || {}).map((field, i) => (
                    <TableCell key={i}>{getFieldLabel(table, field)}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data[table].map((row, rIdx) => (
                  <TableRow key={rIdx}>
                    {Object.keys(row).map((field, fIdx) => (
                      <TableCell key={fIdx}>
                        {String(row[field] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      ))}
    </Box>
  );
}

ResultTabs.propTypes = {
  data: PropTypes.object.isRequired
};
