export const logInfo = (message, data = {}) => {
    console.info("[INFO] 🧩", message, data);
  };
  
  export const logWarn = (message, data = {}) => {
    console.warn("[WARN] ⚠️", message, data);
  };
  
  export const logError = (message, error) => {
    console.error("[ERROR] 💥", message, error);
  };
  