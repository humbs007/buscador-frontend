import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function ToastNotification({ open, onClose, message, severity = 'success' }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ToastNotification;
