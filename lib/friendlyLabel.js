// frontend/lib/friendlyLabel.js

import labelsMap from '../utils/labelsMap'; // opcional
import { DB_SCHEMA } from './db_schema_config';

export function normalizeMetaField(field) {
  return field
    .replace(/^PN_|^CC_|^CO_|^INS_|^CPC_|^OL_|^LC_/, '') // remove prefixos comuns
    .replace(/_/g, ' ') // underscore → espaço
    .replace(/\bCPF\b|\bCNPJ\b/, 'CPF/CNPJ')
    .toUpperCase()
    .trim();
}

export function getFriendlyLabel(table, field) {
  // 1. busca por config oficial
  const labelFromSchema = DB_SCHEMA?.tabelas?.[table?.toLowerCase?.()]?.campos?.[field];
  if (labelFromSchema) return labelFromSchema;

  // 2. busca no labelsMap.js legado
  if (labelsMap?.[field]) return labelsMap[field];

  // 3. fallback heurístico
  return normalizeMetaField(field);
}
