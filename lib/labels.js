// frontend/lib/labels.js
import { DB_SCHEMA } from './db_schema_config';

export const TABLE_LABELS = {};
export const FRIENDLY_LABELS = {};

Object.entries(DB_SCHEMA).forEach(([tableName, tableConfig]) => {
  TABLE_LABELS[tableName] = tableConfig.label;

  const fieldLabels = {};
  Object.entries(tableConfig.fields).forEach(([fieldName, fieldInfo]) => {
    fieldLabels[fieldName] = fieldInfo.label;
  });

  FRIENDLY_LABELS[tableName.replace('table_', '')] = fieldLabels;
});

export const getFriendlyLabel = (table, field) => {
  const key = table?.toLowerCase()?.replace('table_', '');
  return FRIENDLY_LABELS[key]?.[field] || field;
};

export const getTableLabel = (table) => {
  return TABLE_LABELS[table?.toLowerCase()] || table?.toUpperCase();
};
