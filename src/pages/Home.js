import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '10%' }}>
      <Typography variant="h3" gutterBottom>
        Buscador Multi Dados V2
      </Typography>
      <Typography variant="h6" gutterBottom>
        Realize buscas inteligentes em seus bancos de dados.
      </Typography>
      <Button variant="contained" color="primary" size="large" href="/search">
        Iniciar Busca
      </Button>
    </Container>
  );
}

export default Home;
