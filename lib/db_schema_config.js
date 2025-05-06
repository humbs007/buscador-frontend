/**
 * 🔁 Mapeamento de aliases unificados válidos (model-based) para "TODAS"
 * ⚠️ Atenção: baseado nas colunas existentes nas tabelas com model refletido.
 */
export const UNIFIED_KEYS = [
  'CPF/CNPJ',
  'UF Geral',
  'CIDADE Geral',
  'Bairro Geral',
  'CONSUMOS META'
];

export const UNIFIED_FIELDS = {
  'CPF/CNPJ': ['CPF'], // 🔥 somente campos realmente existentes nos models
  'UF Geral': ['UF'],
  'CIDADE Geral': ['Cidade', 'CIDADE', 'OL_Municipio_ObjLig'],
  'Bairro Geral': ['Bairro', 'BAIRRO', 'OL_Bairro_ObjLig'],
  'CONSUMOS META': [
    'CONSUMO1', 'CONSUMO2', 'CONSUMO3', 'CONSUMO4', 'CONSUMO5',
    'CONSUMO6', 'CONSUMO7', 'CONSUMO8', 'CONSUMO9', 'CONSUMO10'
  ]
};

/**
 * 🔒 Schema completo usado para labels e exportações
 */
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
    }
  }
};

/**
 * 🏷️ Nome amigável da TABELA
 */
export function getTableLabel(table) {
  return DB_SCHEMA?.tabelas?.[table?.toLowerCase?.()]?.nome || table?.toUpperCase?.();
}

/**
 * 🏷️ Nome amigável do CAMPO
 */
export function getFieldLabel(table, field) {
  if (UNIFIED_KEYS.includes(field)) return field;
  const schema = DB_SCHEMA?.tabelas?.[table?.toLowerCase?.()];
  return schema?.campos?.[field] || field;
}

/**
 * 🔁 Retorna as colunas reais associadas a um campo unificado
 */
export function getUnifiedFields(key) {
  return UNIFIED_FIELDS[key] || [key];
}

/**
 * 📚 Retorna todas as chaves de busca unificadas
 */
export function getAllUnifiedKeys() {
  return UNIFIED_KEYS;
}
