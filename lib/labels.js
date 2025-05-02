// frontend/lib/labels.js

export const TABLE_LABELS = {
    table_enel: 'ENEL',
    table_meta: 'META',
    table_credlink: 'CREDLINK',
    enel: 'ENEL',
    meta: 'META',
    credlink: 'CREDLINK',
  };
  
  export const FRIENDLY_LABELS = {
    enel: {
      PN_CPF: 'CPF',
      PN_Nome: 'Nome',
      INS_Consumo_Estimado: 'Consumo Estimado',
      PN_Endereco: 'Endereço',
      PN_Cidade: 'Cidade',
      PN_CEP: 'CEP',
      PN_UF: 'UF',
    },
    meta: {
      CPF: 'CPF',
      NOME: 'Nome',
      ENDERECO: 'Endereço',
      CIDADE: 'Cidade',
      UF: 'UF',
      DT_REFERENCIA: 'Data de Referência',
      CONSUMO: 'Consumo Total',
    },
    credlink: {
      CPF: 'CPF',
      NOME: 'Nome',
      LOGRADOURO: 'Logradouro',
      NUMERO: 'Número',
      CIDADE: 'Cidade',
      ESTADO: 'Estado',
      UF: 'UF',
      DT_NASCIMENTO: 'Data de Nascimento',
      NOME_MAE: 'Nome da Mãe',
      SEXO: 'Sexo',
      EMAIL: 'Email',
      FLAG_OBITO: 'Óbito',
      RENDA_PRESUMIDA: 'Renda Presumida',
      FAIXA_RENDA: 'Faixa de Renda',
      TEL_FIXO1: 'Telefone Fixo',
      CELULAR1: 'Celular',
    }
  };
  
  // Resolve nome técnico para label amigável
  export const getFriendlyLabel = (table, field) => {
    const t = table.toLowerCase();
    return FRIENDLY_LABELS[t]?.[field] || field;
  };
  
  // Resolve nome técnico da tabela
  export const getTableLabel = (table) => {
    return TABLE_LABELS[table.toLowerCase()] || table.toUpperCase();
  };
  