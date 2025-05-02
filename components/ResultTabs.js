// frontend/components/ResultTabs.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from '@mui/material';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`result-tabpanel-${index}`}
      aria-labelledby={`result-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `result-tab-${index}`,
    'aria-controls': `result-tabpanel-${index}`
  };
}

export default function ResultTabs({ data }) {
  const [value, setValue] = React.useState(0);
  const tableNames = Object.keys(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTable = (rows, tableKey) => {
    if (!rows || rows.length === 0) {
      return <Typography variant="body1">Sem resultados para essa tabela.</Typography>;
    }

    const columns = Object.keys(rows[0]);

    return (
      <Paper variant="outlined" sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{getFriendlyLabel(tableKey, col)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col}>{String(row[col] ?? '')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {tableNames.map((tableName, index) => (
            <Tab
              key={index}
              label={getTableLabel(tableName)}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tableNames.map((tableName, index) => (
        <TabPanel key={index} value={value} index={index}>
          {renderTable(data[tableName], tableName)}
        </TabPanel>
      ))}
    </Box>
  );
}

ResultTabs.propTypes = {
  data: PropTypes.object.isRequired
};
