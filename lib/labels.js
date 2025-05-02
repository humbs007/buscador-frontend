// frontend/lib/labels.js

// 📦 Nome amigável das tabelas
export const TABLE_LABELS = {
  table_enel: 'ENEL',
  enel: 'ENEL',
  table_meta: 'META',
  meta: 'META',
  table_credlink: 'CREDLINK',
  credlink: 'CREDLINK',
  todas: 'TODAS',
};

// 🏷️ Labels humanizados por tabela
export const FRIENDLY_LABELS = {
  enel: {
    PN_CPF: 'CPF',
    PN_Nome: 'Nome',
    INS_Consumo_Estimado: 'Consumo Estimado',
    PN_Endereco: 'Endereço',
    PN_Cidade: 'Cidade',
    PN_CEP: 'CEP',
    PN_UF: 'UF',
    PN_RG: 'RG',
    PN_CNPJ: 'CNPJ',
    PN_Dta_Nasc: 'Nascimento',
    PN_Tmp_Criacao_Ano: 'Anos como cliente',
  },
  meta: {
    CPF: 'CPF',
    NOME: 'Nome',
    ENDERECO: 'Endereço',
    CIDADE: 'Cidade',
    UF: 'UF',
    DT_REFERENCIA: 'Data de Referência',
    CONSUMO: 'Consumo Total',
    CONSUMO1: 'Consumo 1',
    CONSUMO2: 'Consumo 2',
    CONSUMO3: 'Consumo 3',
    CONSUMO4: 'Consumo 4',
    CONSUMO5: 'Consumo 5',
    CONSUMO6: 'Consumo 6',
    CONSUMO7: 'Consumo 7',
    CONSUMO8: 'Consumo 8',
    CONSUMO9: 'Consumo 9',
    CONSUMO10: 'Consumo 10',
  },
  credlink: {
    CPF: 'CPF',
    NOME: 'Nome',
    LOGRADOURO: 'Logradouro',
    NUMERO: 'Número',
    CIDADE: 'Cidade',
    ESTADO: 'Estado',
    UF: 'UF',
    DT_NASCIMENTO: 'Nascimento',
    NOME_MAE: 'Nome da Mãe',
    SEXO: 'Sexo',
    EMAIL: 'E-mail',
    FLAG_OBITO: 'Óbito',
    RENDA_PRESUMIDA: 'Renda Presumida',
    FAIXA_RENDA: 'Faixa de Renda',
    TEL_FIXO1: 'Telefone Fixo',
    CELULAR1: 'Celular',
  },
};

// 🔁 Geração de label amigável baseado na tabela e campo
export const getFriendlyLabel = (table, field) => {
  const t = table?.toLowerCase?.() ?? '';
  return FRIENDLY_LABELS[t]?.[field] || field;
};

// 📛 Geração de label de tabela
export const getTableLabel = (table) => {
  return TABLE_LABELS[table?.toLowerCase?.()] || table?.toUpperCase?.();
};

// 🧠 Utilitário para unificar campos repetidos (TODAS)
export const mergeIndexFields = (tableIndexMap) => {
  const all = new Set();
  Object.values(tableIndexMap).forEach(fields => {
    fields.forEach(f => all.add(f));
  });
  return Array.from(all);
};

// 🧠 Campo especial: se "CONSUMO1" a "CONSUMO10" => retorna 'CONSUMO'
export const normalizeMetaField = (field) => {
  if (/^CONSUMO\d+$/.test(field)) return 'CONSUMO';
  return field;
};
