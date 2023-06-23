import React, { Component } from 'react';
import { CircularProgress, IconButton, Paper, styled, ThemeProvider, createTheme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PopupSearch from './PopupSearch';

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
  },
});

const StyledTableContainer = styled(Paper)({
  width: '100%',
  height: 'calc(100vh - 200px)',
  backgroundColor: theme.palette.grey[800],
});




class StaticInvoiceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      page: 0,
      rowsPerPage: 10,
      isLoading: true,
      isSearchOpen: false,
      filteredInvoices: [],
    };
  }

  componentDidMount() {
    const data = require('../static_data/DataLoadingServlet.json');
    this.setState({ invoices: data, isLoading: false, filteredInvoices: data });
  }

  handleChangePage = (newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  handleOpenSearch = () => {
    this.setState({ isSearchOpen: true });
  };

  handleCloseSearch = () => {
    this.setState({ isSearchOpen: false });
  };

  handleSearch = (searchFields) => {
    const { invoices } = this.state;

    const filteredInvoices = invoices.filter((invoice) => {
      return Object.entries(searchFields).every(([field, value]) => {
        const invoiceValue = invoice[field];

        if (field === 'slNo' && value !== '') {
          return String(invoiceValue) === String(value);
        }
        else if (field === 'uniqueCustId' && value !== '') {
          return String(invoiceValue) === String(value);
        }
        else if (field === 'orderAmount' && value !== '') {
          const searchAmount = parseFloat(value);

          return (
            !isNaN(searchAmount) &&
            invoiceValue >= searchAmount - 100 &&
            invoiceValue <= searchAmount + 100
          );
        }
        else if (field === 'amountInUsd' && value !== '') {
          const searchAmount = parseFloat(value);
          return (
            !isNaN(searchAmount) &&
            invoiceValue >= searchAmount - 100 &&
            invoiceValue <= searchAmount + 100
          );
        }

        else {
          return String(invoiceValue).toLowerCase().includes(String(value).toLowerCase());
        }
      });
    });

    this.setState({ filteredInvoices });
  };

  generateRowId = (row) => {
    return `${row.slNo}-${row.customerOrderID}-${row.salesOrg}-${row.distributionChannel}`;
  };

  render() {
    const { filteredInvoices, page, rowsPerPage, isLoading, isSearchOpen } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <StyledTableContainer>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress sx={{ color: 'white' }} />
            </div>
          ) : (
            <DataGrid
              rows={filteredInvoices}
              columns={[
                { field: 'slNo', headerName: 'Sl. No.', width: 80 },
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
              onPageChange={this.handleChangePage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowCount={filteredInvoices.length}
              onPageSizeChange={this.handleChangeRowsPerPage}
              loading={isLoading}
              getRowId={this.generateRowId}
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection
              disableSelectionOnClick
            />
          )}
        </StyledTableContainer>
        <IconButton
          color="primary"
          aria-label="search"
          onClick={this.handleOpenSearch}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <SearchIcon />
        </IconButton>
        <PopupSearch isOpen={isSearchOpen} onClose={this.handleCloseSearch} onSearch={this.handleSearch} />
      </ThemeProvider>
    );
  }
}

export default StaticInvoiceTable;
