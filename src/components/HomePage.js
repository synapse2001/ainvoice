import React, { useState, useEffect } from 'react';
import { CircularProgress, IconButton, styled, createTheme, ThemeProvider, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PopupSearch from './PopupSearch';
import axios from 'axios';
import PopupDelete from './PopupDelete';
import PopupEdit from './PopupEdit';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
    action: {
      active: '#ffffff',
    },
    background: {
      default: '#424242',
      paper: '#424242',
    },
    grey: {
      800: '#424242',
    },
    button_color: {
      main: '#3F51B5',
    },
    edit_color: {
      main: '#388E3C',
    },
  },
});

const StyledTableContainer = styled('div')({
  width: '100%',
  height: 'calc(100vh - 200px)',
  backgroundColor: theme.palette.grey[800],
});

const Homepage = ({ invoices, isLoading, onRefresh }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [ispredicting, setIspredicting] = useState(false)
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [slno, setSlno] = useState([])

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const generateRowId = (row) => {
    return `${row.slNo}-${row.customerOrderID}-${row.salesOrg}-${row.distributionChannel}`;
  };
  const handleSelectionModelChange = (ids) => {
    setSelectedInvoiceIds(ids);
    console.log(ids)
    const selectedIds = ids.map((id) => id.split("-")[0]);
    console.log(selectedIds)
    const selectedInvoicesData = filteredInvoices.filter(
      invoice => selectedIds.includes(invoice.slNo.toString())
    );
    setSelectedInvoices(selectedInvoicesData)
  };
  const handlePredictSelected = () => {
    setIspredicting(true)
    console.log(selectedInvoices);
    axios.post('https://synapse.068gaganagarwal.repl.co/predict'
    // axios.post('http://127.0.0.1:5000/predict'
    , selectedInvoices)
      .then(response => {
        const predictions = response.data;
        console.log(response.data)
        const updatedInvoices = filteredInvoices.map(invoice => {
          const invoiceId = invoice.slNo.toString();
          const selectedIds = selectedInvoiceIds.map((id) => id.split("-")[0]);
          if (selectedIds.includes(invoiceId)) {
            const prediction = predictions[selectedIds.indexOf(invoiceId)];
            return { ...invoice, orderAmount: prediction };
          }
          return invoice;
        });
        setIspredicting(false)
        setFilteredInvoices(updatedInvoices);
      })
      .catch(error => {
        console.error('Error predicting:', error);
        setIspredicting(false)
      });
  };

  const handleDeleteButtonClick = () => {
    // console.log(selectedInvoices)
    // setSelectedInvoiceSlNo(slNo);
    const selectedSlNos = selectedInvoices.map(invoice => invoice.slNo);
    setSlno(selectedSlNos)
    setOpenDeletePopup(true);
  };

  const handleDeletePopupClose = () => {
    setOpenDeletePopup(false);
  };
  const handleRefreshButtonClick = () => {
    onRefresh();
  };
  const handleEditPopupClose = () => {
    setOpenEditPopup(false);
  };
  const handleEditButtonClick = () => {
    setOpenEditPopup(true);
  };


  return (
    <ThemeProvider theme={theme}>
      <div>
        <StyledTableContainer>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={filteredInvoices}
              columns={[
                { field: 'slNo', headerName: 'Sl. No.', width: 100 },
                { field: 'customerOrderID', headerName: 'Customer Order ID', width: 150 },
                { field: 'salesOrg', headerName: 'Sales Org', width: 100 },
                { field: 'distributionChannel', headerName: 'Distribution Channel', width: 160 },
                { field: 'division', headerName: 'Division', width: 100 },
                { field: 'releasedCreditValue', headerName: 'Released Credit Value', width: 160 },
                { field: 'purchaseOrderType', headerName: 'Purchase Order Type', width: 160 },
                { field: 'companyCode', headerName: 'Company Code', width: 100 },
                { field: 'orderCreationDate', headerName: 'Order Creation Date', width: 160 },
                { field: 'orderCreationTime', headerName: 'Order Creation Time', width: 160 },
                { field: 'creditControlArea', headerName: 'Credit Control Area', width: 100 },
                { field: 'soldToParty', headerName: 'Sold To Party', width: 160 },
                { field: 'orderAmount', headerName: 'Order Amount', width: 160 },
                { field: 'requestedDeliveryDate', headerName: 'Requested Delivery Date', width: 180 },
                { field: 'orderCurrency', headerName: 'Order Currency', width: 120 },
                { field: 'creditStatus', headerName: 'Credit Status', width: 120 },
                { field: 'customerNumber', headerName: 'Customer Number', width: 120 },
                { field: 'amountInUsd', headerName: 'Amount in USD', width: 160 },
                { field: 'uniqueCustId', headerName: 'Unique Cust ID', width: 160 },
              ]}
              pageSize={rowsPerPage}
              pagination
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowCount={filteredInvoices.length}
              onPageSizeChange={handleChangeRowsPerPage}
              loading={isLoading}
              getRowId={generateRowId}
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection
              onRowSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
            />
          )}
        </StyledTableContainer>
        <div style={{ margin: '1rem', textAlign: 'left' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={handleRefreshButtonClick}
            style={{ marginRight: '1rem' }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="edit_color"
            disabled={selectedInvoiceIds.length !== 1 || isLoading}
            onClick={handleEditButtonClick}
            style={{ marginRight: '1rem' }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedInvoiceIds.length === 0 || isLoading}
            onClick={
              handleDeleteButtonClick
            }
            style={{ marginRight: '1rem' }}

          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="button_color"
            disabled={isLoading || selectedInvoiceIds.length === 0 || ispredicting}
            onClick={handlePredictSelected}
          >
            {ispredicting ? "Predicting" : "Predict"}
          </Button>
        </div>
        <PopupDelete
          selectedInvoices={slno}
          open={openDeletePopup}
          onClose={handleDeletePopupClose}
          onRefresh={onRefresh}
        />
        <PopupEdit
          edit={selectedInvoices}
          open={openEditPopup}
          onClose={handleEditPopupClose}
          onRefresh={onRefresh}
        />
      </div>
    </ThemeProvider>
  );
};

export default Homepage;
