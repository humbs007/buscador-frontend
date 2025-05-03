import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Tab, Tabs, Typography, Card, CardContent,
  Grid, Pagination
} from '@mui/material';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';

const PAGE_SIZE = 100;

function TabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ p: 2 }}>
      {children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default function ResultTabs({ data }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(1);
  const tableNames = Object.keys(data);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
    setPage(1);
  };

  const renderCard = (row, idx, tableKey) => (
    <Grid item xs={12} sm={6} md={4} key={idx}>
      <Card variant="outlined">
        <CardContent>
          {Object.entries(row).map(([key, value]) => (
            <Typography key={key} variant="body2" gutterBottom>
              <strong>{getFriendlyLabel(tableKey, key)}:</strong> {String(value ?? '')}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleChangeTab}>
        {tableNames.map((table, idx) => (
          <Tab key={table} label={getTableLabel(table)} />
        ))}
      </Tabs>

      {tableNames.map((table, idx) => {
        const records = data[table] || [];
        const totalPages = Math.ceil(records.length / PAGE_SIZE);
        const paginated = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

        return (
          <TabPanel key={table} value={tabIndex} index={idx}>
            <Grid container spacing={2}>
              {paginated.map((row, index) => renderCard(row, index, table))}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPages} page={page} onChange={(e, val) => setPage(val)} />
              </Box>
            )}
          </TabPanel>
        );
      })}
    </Box>
  );
}

ResultTabs.propTypes = {
  data: PropTypes.object.isRequired
};
