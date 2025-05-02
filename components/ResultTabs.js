import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

const FIELD_LABELS = {
  // ENEL
  "PN_CPF": "CPF (ENEL)",
  "PN_CNPJ": "CNPJ (ENEL)",
  // META
  "CPF": "CPF (META)",
  "CONSUMO": "Consumo Estimado",
  // CREDLINK
  "NOME": "Nome Completo",
  "NOME_MAE": "Nome da Mãe",
  "CELULAR1": "Celular 1",
  "TEL_FIXO1": "Telefone Fixo 1",
  "RENDA_PRESUMIDA": "Renda Presumida",
  "DT_NASCIMENTO": "Data de Nascimento",
  "EMAIL": "Email",
};

const formatLabel = (field) => {
  return FIELD_LABELS[field] || field.replace(/_/g, ' ').toUpperCase();
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
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
  index: PropTypes.number.isRequired,
};

export default function ResultTabs({ data }) {
  const tables = Object.keys(data);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>📋 Resultados das Tabelas</Typography>
      <Paper elevation={3}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tables.map((table, index) => (
            <Tab key={index} label={table.replace("table_", "").toUpperCase()} />
          ))}
        </Tabs>

        {tables.map((table, index) => {
          const records = data[table];
          const columns = records.length > 0 ? Object.keys(records[0]) : [];

          return (
            <TabPanel key={index} value={selectedTab} index={index}>
              {records.length === 0 ? (
                <Typography variant="body1">Nenhum resultado encontrado.</Typography>
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {columns.map((col, i) => (
                        <TableCell key={i}>{formatLabel(col)}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((col, colIndex) => (
                          <TableCell key={colIndex}>
                            {String(row[col]) || ''}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabPanel>
          );
        })}
      </Paper>
    </Box>
  );
}
