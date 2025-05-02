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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

export default function ResultTabs({ data }) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const tableNames = Object.keys(data);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const renderTable = (rows, tableKey) => {
    if (!rows || rows.length === 0) {
      return <Typography>Nenhum resultado encontrado.</Typography>;
    }

    const columns = Object.keys(rows[0]);

    return (
      <Paper variant="outlined" sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>
                  {getFriendlyLabel(tableKey, col)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col}>
                    {String(row[col] ?? '')}
                  </TableCell>
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tableNames.map((table, index) => (
            <Tab
              key={table}
              label={getTableLabel(table)}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tableNames.map((table, index) => (
        <TabPanel key={table} value={tabIndex} index={index}>
          {renderTable(data[table], table)}
        </TabPanel>
      ))}
    </Box>
  );
}

ResultTabs.propTypes = {
  data: PropTypes.object.isRequired
};
