import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Buscador Multi-Dados • V3</title>
        <meta name="description" content="Sistema de busca em múltiplas fontes com filtros inteligentes." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              🔎 Buscador Inteligente V3
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Consulte múltiplas fontes com filtros otimizados e exporte resultados em tempo real.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <SearchForm />
        </Paper>
      </Container>
    </>
  );
}
