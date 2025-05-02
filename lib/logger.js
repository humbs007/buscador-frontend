// frontend/lib/logger.js

export const logInfo = (msg, data = null) => {
    console.info(`[INFO] ${msg}`, data || '');
  };
  
  export const logWarn = (msg, data = null) => {
    console.warn(`[WARN] ${msg}`, data || '');
  };
  
  export const logError = (msg, error = null) => {
    console.error(`[ERROR] ${msg}`, error || '');
  };
  