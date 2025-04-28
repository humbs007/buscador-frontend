import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '10%' }}>
      <Box sx={{ bgcolor: '#1976d2', borderRadius: 3, p: 4 }}>
        <Typography variant="h3" color="white" gutterBottom>
          Buscador Multi Dados V2
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          Consultas inteligentes, exportação eficiente, velocidade máxima.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          href="/search"
          sx={{ mt: 4, bgcolor: 'white', color: '#1976d2', fontWeight: 'bold' }}
        >
          Iniciar Busca
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
