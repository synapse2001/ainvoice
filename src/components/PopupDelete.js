import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PopupDelete = ({ selectedInvoices, open, onClose, onRefresh }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  const handleDeleteInvoice = async () => {
    try {
      for (let i = 0; i < selectedInvoices.length; i++) {
        const currentSlNo = selectedInvoices[i];

        await axios.post(
          // 'http://localhost:8080/ainvoice_backend/DeleteInvoiceServlet',
          'https://ainvoice-backend.azurewebsites.net/DeleteInvoiceServlet',
          { slNo: currentSlNo },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log('Invoice deleted successfully', currentSlNo);
      }

      setSnackbarMessage('Invoices deleted successfully');
      setSnackbarType('success');
      setSnackbarOpen(true);

      onClose();
      onRefresh();
    } catch (error) {
      console.error('Error deleting invoices:', error);

      setSnackbarMessage('Error deleting invoices');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedInvoices]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete selected invoices?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDeleteInvoice} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          elevation={6}
          variant="filled"
          severity={snackbarType}
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PopupDelete;
