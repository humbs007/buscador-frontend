// frontend/pages/index.js

import Head from 'next/head';
import SearchForm from '../components/SearchForm';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>Buscador Multi Dados V3</title>
        <meta name="description" content="Sistema de buscas avançadas em múltiplas tabelas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Buscador Multi Dados V3
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Selecione uma tabela, campo e insira o valor de busca. Os resultados serão exibidos abaixo.
            </Typography>
          </Box>
          <SearchForm />
        </Paper>
      </Container>
    </>
  );
}
