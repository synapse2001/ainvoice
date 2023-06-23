import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, createTheme, ThemeProvider } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    //   htmlFontSize: 16,
    fontFamily: ['Arial', 'sans-serif'].join(','),
    body1: {
      background: 'none',
      color: '#a4a6a5',
    },
  },

});



const AddFormData = () => {
  const [formData, setFormData] = useState({
    slNo: '123',
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
    uniqueCustID: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  //   const [snackbarOpen, setSnackbarOpen] = useState(true);
  //   const [snackbarMessage, setSnackbarMessage] = useState('success');
  //   const [severity,setSeverity] = useState('error');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = { ...formData };

    axios
      // .post('http://localhost:8080/ainvoice_backend/AddServlet'
      .post('https://ainvoice-backend.azurewebsites.net/AddServlet'
      , requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response.data === "Inserted data") {
          setSeverity("success")
          setSnackbarMessage("Data Inserted Successfully")
          setSnackbarOpen(true);
          console.log('Form submitted successfully', response.data);
        } else { setSeverity("error"); setSnackbarOpen(true); setSnackbarMessage("Server Error"); }
      })
      .catch((error) => {
        console.log('Form submission failed', error);
        setSeverity("error")
        setSnackbarMessage("Server Error");
        setSnackbarOpen(true);
      });


    setFormData({
      slNo: '123',
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
      uniqueCustID: '',
    });
  };

  const handleSuccessSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', justifyContent: "center" }}>
          <TextField
            label="Sl_no"
            type="number"
            name="slNo"
            value={"Auto"}
            onChange={handleChange}
            disabled
            placeholder='AutoIncrement'
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
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', justifyContent: "center" }}>
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
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', justifyContent: "center" }}>
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
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', justifyContent: "center" }}>
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
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', justifyContent: "center" }}>
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
            name="uniqueCustID"
            value={formData.uniqueCustID}
            onChange={handleChange}
            required
          />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" style={{ width: '223px', height: '51px' }}>
                Submit
              </Button>
            </div>
            {snackbarOpen && (
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSuccessSnackbarClose}
                style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', width: '223px', height: '51px' }}
              >
                <Alert onClose={handleSuccessSnackbarClose} severity={severity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            )}
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default AddFormData;
