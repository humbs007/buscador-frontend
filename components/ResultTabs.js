// frontend/src/components/ResultTabs.js
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

function ResultTabs({ data }) {
  const [value, setValue] = React.useState(0);
  const tables = Object.keys(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {tables.map((table, idx) => (
          <Tab key={table} label={table} />
        ))}
      </Tabs>
      <Box sx={{ p: 2 }}>
        <pre>{JSON.stringify(data[tables[value]], null, 2)}</pre>
      </Box>
    </>
  );
}

export default ResultTabs;
