// lib/labels.js

export const TABLE_LABELS = {
  table_cemig: 'CEMIG',
  table_credlink: 'CREDLINK',
  table_enel: 'ENEL',
  table_meta: 'META',
  table_plano_saude: 'PLANO SAÚDE',
  table_vidatoda: 'VIDATODA',
  todas: 'TODAS',
};

export const FRIENDLY_LABELS = {
  todas: {
    'CPF/CNPJ': 'CPF/CNPJ',
    'UF Geral': 'UF Geral',
    'CIDADE Geral': 'Cidade Geral',
    'Bairro Geral': 'Bairro Geral',
    'CONSUMOS META': 'Consumos META'
  },

  cemig: {
    CPF: 'CPF',
    Nome: 'Nome',
    Cidade: 'Cidade',
    UF: 'UF',
    EMAIL: 'Email',
    Telefone: 'Telefone',
    TIPO_TELEFONE: 'Tipo Telefone',
    CEP: 'CEP',
    Bairro: 'Bairro',
    DDD: 'DDD',
    DDD1: 'DDD Alternativo',
    TELEFONE1: 'Telefone Alternativo',
    consumo_medio: 'Consumo Médio',
    Complemento: 'Complemento',
    Numero: 'Número',
    Endereco: 'Endereço',
    DataNascimento: 'Data de Nascimento',
    EMAIL: 'Email'
  },

  credlink: {
    CPF: 'CPF',
    NOME: 'Nome',
    CIDADE: 'Cidade',
    UF: 'UF',
    ESTADO: 'Estado',
    BAIRRO: 'Bairro',
    EMAIL: 'Email',
    TEL_FIXO1: 'Telefone Fixo 1',
    CELULAR1: 'Celular 1',
    QT_VEICULOS: 'Qtd. Veículos',
    RENDA_PRESUMIDA: 'Renda Presumida',
    FLAG_OBITO: 'Flag Óbito',
    DT_OBITO: 'Data de Óbito',
    STATUS_RECEITA_FEDERAL: 'Status Receita Federal',
    PCT_CARGO_SOCIETARIO: '% Cargo Societário',
    CBO: 'CBO',
    FAIXA_RENDA: 'Faixa de Renda'
  },

  enel: {
    PN_CPF: 'CPF',
    PN_CNPJ: 'CNPJ',
    PN_NOME: 'Nome',
    PN_Email: 'Email',
    PN_Fone_Celular: 'Celular',
    PN_Fone_Fixo: 'Telefone Fixo',
    OL_Bairro_ObjLig: 'Bairro',
    OL_Municipio_ObjLig: 'Município',
    OL_Regiao: 'Região',
    INS_Consumo_Estimado: 'Consumo Estimado',
    INS_Carga_Instalada: 'Carga Instalada',
    INS_Instalacao: 'Instalação',
    CC_Conta_Contrato: 'Conta Contrato',
    UF: 'UF'
  },

  meta: {
    CPF: 'CPF',
    UF: 'UF',
    BAIRRO: 'Bairro',
    CIDADE: 'Cidade',
    DT_ATUALIZACAO: 'Data Atualização',
    DT_INCLUSAO: 'Data Inclusão',
    CONSUMO1: 'Consumo 1',
    CONSUMO2: 'Consumo 2',
    CONSUMO3: 'Consumo 3',
    CONSUMO4: 'Consumo 4',
    CONSUMO5: 'Consumo 5',
    CONSUMO6: 'Consumo 6',
    CONSUMO7: 'Consumo 7',
    CONSUMO8: 'Consumo 8',
    CONSUMO9: 'Consumo 9',
    CONSUMO10: 'Consumo 10'
  },

  plano_saude: {
    cnpj: 'CNPJ',
    operadora: 'Operadora',
    nome_plano: 'Nome do Plano',
    razao_social: 'Razão Social',
    telefone1: 'Telefone 1',
    telefone2: 'Telefone 2',
    telefone3: 'Telefone 3',
    telefone: 'Telefone',
    email: 'Email',
    data_vigencia: 'Data de Vigência',
    produto: 'Produto',
    sub_produto: 'Subproduto',
    valor: 'Valor',
    qtd_vidas: 'Qtd. Vidas',
    telefone_empresa: 'Telefone da Empresa',
    cpf: 'CPF',
    nome: 'Nome',
    data_nascimento: 'Data de Nascimento',
    carterinha: 'Carteirinha',
    cpf_score: 'Score CPF',
    cnpj_uf: 'UF do CNPJ',
    cnpj_qtde_func: 'Qtd. Funcionários',
    cnpj_faturamento: 'Faturamento'
  },

  vidatoda: {
    CPF: 'CPF',
    NOME: 'Nome',
    MAE: 'Nome da Mãe',
    NASCIMENTO: 'Nascimento',
    ENDERECO: 'Endereço',
    BAIRRO: 'Bairro',
    CIDADE: 'Cidade',
    UF: 'UF',
    CEP: 'CEP',
    TELEFONE: 'Telefone',
    NB: 'NB',
    NIT: 'NIT',
    PIS: 'PIS',
    CTPS_NUMERO: 'Nº CTPS',
    CTPS_SERIE: 'Série CTPS',
    CBO: 'CBO',
    OCUPACAO: 'Ocupação',
    CNPJ_EMPRESA: 'CNPJ Empresa',
    RAZAO_EMPRESA: 'Razão Empresa',
    FANTASIA_EMPRESA: 'Fantasia',
    SALARIO_EMPRESA: 'Salário Empresa',
    MUNICIPIO_EMPRESA: 'Município Empresa',
    UF_EMPRESA: 'UF Empresa',
    ADMISSAO_EMPRESA: 'Admissão'
  }
};

export const getFriendlyLabel = (table, field) => {
  const key = table?.toLowerCase?.().replace('table_', '');
  return FRIENDLY_LABELS[key]?.[field] || FRIENDLY_LABELS['todas'][field] || field;
};

export const getTableLabel = (table) => {
  return TABLE_LABELS[table?.toLowerCase?.()] || table?.toUpperCase?.();
};
