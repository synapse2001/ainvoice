import React, { Component } from 'react';
import { Box, Tab, Tabs, ThemeProvider, createTheme, IconButton, TextField, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import Homepage from './HomePage';
import AddDataForm from './AddDataForm';
import AnalyticsView from './AnalyticsView';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import PopupSearch from './PopupSearch';

const theme = createTheme({
  palette: {
    primary: { main: '#ffffff' },
    grey,
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['Arial', 'sans-serif'].join(','),
    body1: {
      background: 'none',
      color: '#a4a6a5',
    },
  },
});

class InvoiceTable extends Component {
  state = {
    selectedTab: 0,
    invoices: [],
    isLoading: true,
    searchField: '',
    searchResults: [],
    isSearchOpen: false,
  };

  componentDidMount() {
    this.fetchInvoices();
  }

  fetchInvoices = async () => {
    try {
      // const response = await axios.get('http://localhost:8080/ainvoice_backend/DataLoadingServlet');
      const response = await axios.get('https://ainvoice-backend.azurewebsites.net/DataLoadingServlet');
      const data = response.data;
      this.setState({ invoices: data, isLoading: false });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleSearchFieldChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleSearch = () => {
    const { invoices, searchField } = this.state;
    const searchResults = invoices.filter((invoice) => {
      return parseInt(invoice.customerOrderID) === parseInt(searchField);
    });
    this.setState({ searchResults, selectedTab: 3 });
  };

  handleOpenSearch = () => {
    this.setState({ isSearchOpen: true })
  };

  handleCloseSearch = () => {
    this.setState({ isSearchOpen: false })
  };

  handleAdvsearch = (searchFields) => {
    const { invoices } = this.state;
    const filteredInvoices = invoices.filter((invoice) => {
      return Object.entries(searchFields).every(([field, value]) => {
        const invoiceValue = invoice[field];

        if (field === 'slNo' && value !== '') {
          return String(invoiceValue) === String(value);
        } else if (field === 'uniqueCustId' && value !== '') {
          return String(invoiceValue) === String(value);
        } else if (field === 'orderAmount' && value !== '') {
          const searchAmount = parseFloat(value);

          return (
            !isNaN(searchAmount) &&
            invoiceValue >= searchAmount - 100 &&
            invoiceValue <= searchAmount + 100
          );
        } else if (field === 'amountInUsd' && value !== '') {
          const searchAmount = parseFloat(value);
          return (
            !isNaN(searchAmount) &&
            invoiceValue >= searchAmount - 100 &&
            invoiceValue <= searchAmount + 100
          );
        } else {
          return String(invoiceValue).toLowerCase().includes(String(value).toLowerCase());
        }
      });
    });

    this.setState({ searchResults: filteredInvoices, selectedTab: 3 })
  };

  render() {
    const { selectedTab, invoices, isLoading, searchField, searchResults, isSearchOpen } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: grey[800],
            // minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id="searchField"
                label="Search by Customer ID"
                variant="outlined"
                value={searchField}
                onChange={this.handleSearchFieldChange}
                sx={{
                  mr: 1,
                  color: '#ffffff',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
              <IconButton color="primary" aria-label="search" onClick={this.handleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>

            <Button
              color="primary"
              variant="contained"
              onClick={this.handleOpenSearch}
              style={{ height: '50px' }}
            >
              Advanced Search
            </Button>
          </Box>

          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Homepage" sx={{ color: '#d6d6d6' }} />
            <Tab label="Add Data" sx={{ color: '#d6d6d6' }} />
            <Tab label="Analytics View" sx={{ color: '#d6d6d6' }} />
            <Tab label="Search Result" sx={{ color: '#d6d6d6' }} />
          </Tabs>

          <Box sx={{ p: 2, flex: 1 }}>
            {selectedTab === 0 && <Homepage invoices={invoices} isLoading={isLoading} onRefresh={this.fetchInvoices} />}
            {selectedTab === 1 && <AddDataForm />}
            {selectedTab === 2 && <AnalyticsView invoices={invoices} />}
            {selectedTab === 3 && <Homepage invoices={searchResults} isLoading={isLoading} onRefresh={this.fetchInvoices}/>}
          </Box>

          <PopupSearch isOpen={isSearchOpen} onClose={this.handleCloseSearch} onSearch={this.handleAdvsearch} />
        </Box>
      </ThemeProvider>
    );
  }
}

export default InvoiceTable;
