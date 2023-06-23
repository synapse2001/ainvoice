import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, createTheme, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const theme = createTheme({
    palette: {
      background: {
        // default: '#f5f5f5', 
      },
      primary: {
        main: '#ffffff', 
      },
      text: {
        primary: '#ffffff', 
      },
    },
  });
  
const PopupEdit = ({ edit, open, onClose, onRefresh }) => {
  const selectedInvoice = edit[0];
  const [formData, setFormData] = useState({
    slNo: '',
    customerOrderID: '',
    salesOrg: '',
    distributionChannel: '',
    division: '',
    releasedCreditValue: '',
    purchaseOrderType: '',
    companyCode: '',
    orderCreationDate: '',
    orderCreationTime: '',
    creditControlArea: '',
    soldToParty: '',
    orderAmount: '',
    requestedDeliveryDate: '',
    orderCurrency: '',
    creditStatus: '',
    customerNumber: '',
    amountInUsd: '',
    uniqueCustId: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if(selectedInvoice){
    setFormData({
      slNo: selectedInvoice.slNo,
      customerOrderID: selectedInvoice.customerOrderID,
      salesOrg: selectedInvoice.salesOrg,
      distributionChannel: selectedInvoice.distributionChannel,
      division: selectedInvoice.division,
      releasedCreditValue: selectedInvoice.releasedCreditValue,
      purchaseOrderType: selectedInvoice.purchaseOrderType,
      companyCode: selectedInvoice.companyCode,
      orderCreationDate: selectedInvoice.orderCreationDate,
      orderCreationTime: selectedInvoice.orderCreationTime,
      creditControlArea: selectedInvoice.creditControlArea,
      soldToParty: selectedInvoice.soldToParty,
      orderAmount: selectedInvoice.orderAmount,
      requestedDeliveryDate: selectedInvoice.requestedDeliveryDate,
      orderCurrency: selectedInvoice.orderCurrency,
      creditStatus: selectedInvoice.creditStatus,
      customerNumber: selectedInvoice.customerNumber,
      amountInUsd: selectedInvoice.amountInUsd,
      uniqueCustId: selectedInvoice.uniqueCustId,
    })};
  }, [selectedInvoice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("duguwhduw",selectedInvoice)

    const requestData = { ...formData };

    axios
      // .post('http://localhost:8080/ainvoice_backend/UpdateServlet'
      .post('https://ainvoice-backend.azurewebsites.net//UpdateServlet'
      , requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response.data === 'Updated data') {
          setSeverity('success');
          setSnackbarMessage('Data Updated Successfully');
          setSnackbarOpen(true);
          console.log('Form submitted successfully', response.data);
          onClose();
          onRefresh();
        } else {
          setSeverity('error');
          setSnackbarOpen(true);
          setSnackbarMessage('Server Error');
        }
      })
      .catch((error) => {
        console.log('Form submission failed', error);
        setSeverity('error');
        setSnackbarMessage('Server Error');
        setSnackbarOpen(true);
      });
  };

  const handleSuccessSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} PaperProps={{ style: { borderRadius: 16, backgroundColor: 'grey',} }}>
        <DialogTitle>Edit Invoice</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' ,alignItems: 'center',justifyContent:"center", marginTop: '40px'}}>
        <TextField
          label="Sl_no"
          type="number"
          name="slNo"
          value={formData.slNo}
          onChange={handleChange}
          disabled
        />
        <TextField
          label="CUSTOMER_ORDER_ID"
          type="number"
          name="customerOrderID"
          value={formData.customerOrderID}
          onChange={handleChange}
          required
        />
        <TextField
          label="SALES_ORG"
          type="number"
          name="salesOrg"
          value={formData.salesOrg}
          onChange={handleChange}
          required
        />
        <TextField
          label="DISTRIBUTION_CHANNEL"
          type="text"
          name="distributionChannel"
          value={formData.distributionChannel}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px',alignItems: 'center',justifyContent:"center" }}>
        <TextField
          label="DIVISION"
          type="text"
          name="division"
          value={formData.division}
          onChange={handleChange}
          required
        />
        <TextField
          label="RELEASED_CREDIT_VALUE"
          type="number"
          name="releasedCreditValue"
          value={formData.releasedCreditValue}
          onChange={handleChange}
          required
        />
        <TextField
          label="PURCHASE_ORDER_TYPE"
          type="text"
          name="purchaseOrderType"
          value={formData.purchaseOrderType}
          onChange={handleChange}
          required
        />
        <TextField
          label="COMPANY_CODE"
          type="number"
          name="companyCode"
          value={formData.companyCode}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center',justifyContent:"center"}}>
        <TextField
          label="ORDER_CREATION_DATE"
          type="text"
          name="orderCreationDate"
          value={formData.orderCreationDate}
          onChange={handleChange}
          required
        />
        <TextField
          label="ORDER_CREATION_TIME"
          type="text"
          name="orderCreationTime"
          value={formData.orderCreationTime}
          onChange={handleChange}
          required
        />
        <TextField
          label="CREDIT_CONTROL_AREA"
          type="text"
          name="creditControlArea"
          value={formData.creditControlArea}
          onChange={handleChange}
          required
        />
        <TextField
          label="SOLD_TO_PARTY"
          type="number"
          name="soldToParty"
          value={formData.soldToParty}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center',justifyContent:"center"}}>
        <TextField
          label="ORDER_AMOUNT"
          type="number"
          name="orderAmount"
          value={formData.orderAmount}
          onChange={handleChange}
          required
        />
        <TextField
          label="REQUESTED_DELIVERY_DATE"
          type="text"
          name="requestedDeliveryDate"
          value={formData.requestedDeliveryDate}
          onChange={handleChange}
          required
        />
        <TextField
          label="ORDER_CURRENCY"
          type="text"
          name="orderCurrency"
          value={formData.orderCurrency}
          onChange={handleChange}
          required
        />
        <TextField
          label="CREDIT_STATUS"
          type="text"
          name="creditStatus"
          value={formData.creditStatus}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px',alignItems: 'center',justifyContent:"center" }}>
        <TextField
          label="CUSTOMER_NUMBER"
          type="number"
          name="customerNumber"
          value={formData.customerNumber}
          onChange={handleChange}
          required
        />
        <TextField
          label="AMOUNT_IN_USD"
          type="number"
          name="amountInUsd"
          value={formData.amountInUsd}
          onChange={handleChange}
          required
        />
        <TextField
          label="UNIQUE_CUST_ID"
          type="text"
          name="uniqueCustId"
          value={formData.uniqueCustId}
          onChange={handleChange}
          required
        />
        
        <div style={{ position: 'relative' }}>
        </div>
              </div>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" style={{margin: '20px'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSuccessSnackbarClose} variant = "filled" severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default PopupEdit;
