// frontend/pages/index.js

import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Paper } from '@mui/material';
import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Buscador Inteligente</title>
        <meta name="description" content="Sistema de busca de dados ENEL, META e CREDLINK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Buscador de Dados Inteligente
          </Typography>

          <Typography variant="body1" gutterBottom>
            Selecione uma tabela, um campo indexado e insira o valor de busca. Os resultados serão exibidos abaixo, separados por abas.
          </Typography>

          <Box mt={4}>
            <SearchForm />
          </Box>
        </Paper>
      </Container>
    </>
  );
}
