import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Tab, Tabs, Typography, Paper, Grid, Card, CardContent
} from '@mui/material';
import { getFriendlyLabel, getTableLabel } from '../lib/labels';

export default function ResultTabs({ data }) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const tableNames = Object.keys(data || {});

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const renderCard = (record, table, idx) => (
    <Card key={`rec-${idx}`} sx={{ mb: 2, width: '100%' }} variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          {Object.entries(record).map(([key, val], i) => (
            <Grid key={`${key}-${i}`} item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                {getFriendlyLabel(table, key)}
              </Typography>
              <Typography variant="body2">{String(val ?? '')}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {tableNames.map((table, index) => (
          <Tab key={table} label={getTableLabel(table)} />
        ))}
      </Tabs>

      {tableNames.map((table, index) => (
        tabIndex === index && (
          <Box key={`panel-${table}`}>
            {data[table]?.length === 0
              ? <Typography>Nenhum resultado.</Typography>
              : data[table].map((rec, i) => renderCard(rec, table, i))}
          </Box>
        )
      ))}
    </Box>
  );
}

ResultTabs.propTypes = {
  data: PropTypes.object.isRequired
};
