// frontend/components/ResultsCards.js

import React from 'react';
import { Box, Typography, Card, CardContent, Divider, Grid } from '@mui/material';
import { getTableLabel, getFieldLabel } from '../lib/db_schema_config';

export default function ResultsCards({ data }) {
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 3 }}>
        Nenhum resultado encontrado.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {Object.entries(data).map(([tableName, records], idx) => (
        <Box key={idx} sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            📁 {getTableLabel(tableName)} ({records.length} resultado{records.length !== 1 ? 's' : ''})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {records.map((record, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    {Object.entries(record).map(([field, value], idx) => (
                      <Box key={idx} sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                          {getFieldLabel(tableName, field)}:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {String(value || '-')}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
