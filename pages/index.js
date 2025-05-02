// frontend/pages/index.js

import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Paper } from '@mui/material';
import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Buscador Multi-Dados • V3</title>
        <meta name="description" content="Sistema de busca em múltiplas fontes com filtros inteligentes." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              🔍 Buscador Inteligente V3
            </Typography>
            <Typography variant="subtitle1">
              Selecione uma fonte de dados, configure os filtros e consulte resultados em tempo real.
            </Typography>
          </Box>

          <SearchForm />
        </Paper>
      </Container>
    </>
  );
}
