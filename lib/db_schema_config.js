// ✅ frontend/lib/db_schema_config.js

export const UNIFIED_KEYS = [
  'CPF/CNPJ',
  'NOME',
  'TELEFONE',
  'EMAIL',
  'UF',
  'CIDADE',
  'BAIRRO',
  'CONSUMOS META'
];

export const UNIFIED_FIELDS = {
  'CPF/CNPJ': [
    'CPF', 'PN_CPF', 'cpf',
    'CNPJ', 'PN_CNPJ', 'cnpj',
    'CNPJ_EMPRESA'
  ],
  'NOME': [
    'Nome', 'NOME', 'PN_NOME',
    'PN_Nome', 'nome'
  ],
  'TELEFONE': [
    'Telefone', 'telefone', 'TELEFONE',
    'TEL_FIXO1', 'TEL_FIXO2', 'TEL_FIXO3',
    'CELULAR1', 'CELULAR2', 'telefone1',
    'telefone_empresa',
    'PN_Fone_Celular', 'PN_Fone_Fixo',
    'CPC_Fixo', 'CPC_Celular'
  ],
  'EMAIL': [
    'EMAIL', 'email',
    'PN_Email', 'CPC_Email'
  ],
  'UF': [
    'UF', 'ESTADO', 'UF_EMPRESA'
  ],
  'CIDADE': [
    'Cidade', 'CIDADE', 'MUNICIPIO_EMPRESA',
    'OL_Municipio_ObjLig'
  ],
  'BAIRRO': [
    'Bairro', 'BAIRRO',
    'OL_Bairro_ObjLig'
  ],
  'CONSUMOS META': [
    'CONSUMO1', 'CONSUMO2', 'CONSUMO3',
    'CONSUMO4', 'CONSUMO5', 'CONSUMO6',
    'CONSUMO7', 'CONSUMO8', 'CONSUMO9',
    'CONSUMO10', 'INS_Consumo_Estimado'
  ]
};

export const DB_SCHEMA = {
  tabelas: {
    table_cemig: {
      nome: "CEMIG",
      campos: {
        CPF: "CPF",
        Nome: "Nome",
        Cidade: "Cidade",
        UF: "UF",
        consumo_medio: "Consumo Médio",
        EMAIL: "Email",
        Telefone: "Telefone",
        TIPO_TELEFONE: "Tipo Telefone",
        CEP: "CEP",
        Bairro: "Bairro",
        DDD: "DDD"
      }
    },
    table_credlink: {
      nome: "CredLink",
      campos: {
        CPF: "CPF",
        NOME: "Nome",
        CIDADE: "Cidade",
        UF: "UF",
        BAIRRO: "Bairro",
        EMAIL: "Email",
        CELULAR1: "Celular 1",
        QT_VEICULOS: "Qtd. Veículos",
        RENDA_PRESUMIDA: "Renda Presumida",
        FLAG_OBITO: "Flag Óbito"
      }
    },
    table_enel: {
      nome: "ENEL",
      campos: {
        PN_CPF: "CPF",
        PN_CNPJ: "CNPJ",
        PN_NOME: "Nome",
        PN_Email: "Email",
        PN_Fone_Celular: "Celular",
        PN_Fone_Fixo: "Telefone Fixo",
        OL_Bairro_ObjLig: "Bairro",
        OL_Municipio_ObjLig: "Município",
        OL_Regiao: "Região",
        INS_Consumo_Estimado: "Consumo Estimado",
        INS_Carga_Instalada: "Carga Instalada",
        INS_Instalacao: "Instalação",
        CC_Conta_Contrato: "Conta Contrato",
        UF: "UF"
      }
    },
    table_meta: {
      nome: "META",
      campos: {
        CPF: "CPF",
        UF: "UF",
        BAIRRO: "Bairro",
        CIDADE: "Cidade",
        DT_ATUALIZACAO: "Data Atualização",
        CONSUMO1: "Consumo 1",
        CONSUMO2: "Consumo 2",
        CONSUMO3: "Consumo 3",
        CONSUMO4: "Consumo 4",
        CONSUMO5: "Consumo 5",
        CONSUMO6: "Consumo 6",
        CONSUMO7: "Consumo 7",
        CONSUMO8: "Consumo 8",
        CONSUMO9: "Consumo 9",
        CONSUMO10: "Consumo 10"
      }
    },
    table_plano_saude: {
      nome: "PLANO SAÚDE",
      campos: {
        cnpj: "CNPJ",
        operadora: "Operadora",
        nome: "Nome",
        cpf: "CPF",
        email: "Email",
        valor: "Valor",
        telefone1: "Telefone 1",
        telefone_empresa: "Telefone da Empresa",
        qtd_vidas: "Qtd. Vidas"
      }
    },
    table_vidatoda: {
      nome: "VIDATODA",
      campos: {
        CPF: "CPF",
        NOME: "Nome",
        MAE: "Nome da Mãe",
        NASCIMENTO: "Nascimento",
        ENDERECO: "Endereço",
        BAIRRO: "Bairro",
        CIDADE: "Cidade",
        UF: "UF",
        CEP: "CEP",
        TELEFONE: "Telefone",
        PIS: "PIS",
        CBO: "CBO",
        OCUPACAO: "Ocupação",
        CNPJ_EMPRESA: "CNPJ Empresa",
        RAZAO_EMPRESA: "Razão Empresa",
        SALARIO_EMPRESA: "Salário Empresa"
      }
    }
  }
};

export function getTableLabel(table) {
  return DB_SCHEMA?.tabelas?.[table?.toLowerCase?.()]?.nome || table?.toUpperCase?.();
}

export function getFieldLabel(table, field) {
  if (UNIFIED_KEYS.includes(field)) return field.toUpperCase();
  const schema = DB_SCHEMA?.tabelas?.[table?.toLowerCase?.()];
  return schema?.campos?.[field] || field;
}

export function getUnifiedFields(key) {
  return UNIFIED_FIELDS[key] || [key];
}

export function getAllUnifiedKeys() {
  return UNIFIED_KEYS;
}
