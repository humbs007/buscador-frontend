import React, { useState } from 'react';
import ExportButtons from '../components/ExportButtons';

function SearchResults() {
  const [searchParams, setSearchParams] = useState({
    table_name: 'table_enel_energia', // exemplo default
    field: 'PN_CPF',
    operator: '=',
    term: '12345678900'
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Resultados da Pesquisa</h2>
      {/* Aqui poderiam aparecer os resultados */}
      
      {/* Botões de Exportação */}
      <ExportButtons searchParams={searchParams} />
    </div>
  );
}

export default SearchResults;
