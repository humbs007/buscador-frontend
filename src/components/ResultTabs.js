import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

function ResultTabs({ results }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {results.map((group, idx) => (
          <Tab key={idx} label={`Tabela ${idx + 1}`} />
        ))}
      </Tabs>

      {results.map((group, idx) => (
        <Box hidden={tabIndex !== idx} key={idx} sx={{ mt: 3 }}>
          {group.length > 0 ? (
            group.map((row, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                {JSON.stringify(row)}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">Nenhum registro encontrado.</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ResultTabs;
