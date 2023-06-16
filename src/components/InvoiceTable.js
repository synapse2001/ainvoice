import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TablePagination from '@mui/material/TablePagination';
import { blue } from '@mui/material/colors';
import PopupSearch from './PopupSearch';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme();

const StyledTableContainer = styled('div')({
  width: '100%',
  overflowX: 'auto',
});

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  tableLayout: 'fixed',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.primary.contrastText,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[900],
  },
  borderRadius: '4px',
}));

class InvoiceTable extends Component {
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
    fetch('https://7jd2h.localto.net/invoice_management/DataLoadingServlet')
      .then((response) => response.json())
      .then((data) => this.setState({ invoices: data, isLoading: false, filteredInvoices: data }))
      .catch((error) => console.log('Error:', error));
  }

  handleChangePage = (event, newPage) => {
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
      return Object.entries(searchFields).every(([field, value]) =>
        String(invoice[field]).toLowerCase().includes(String(value).toLowerCase())
      );
    });

    this.setState({ filteredInvoices });
  };

  render() {
    const { filteredInvoices, page, rowsPerPage, isLoading, isSearchOpen } = this.state;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, filteredInvoices.length - page * rowsPerPage);

    return (
      <ThemeProvider theme={theme}>
        <StyledTableContainer>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress sx={{ color: 'white' }} />
            </div>
          ) : (
            <StyledTable>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell width="80px">Sl. No.</StyledTableCell>
                  <StyledTableCell width="150px">Customer Order ID</StyledTableCell>
                  <StyledTableCell width="100px">Sales Org</StyledTableCell>
                  <StyledTableCell width="160px">Distribution Channel</StyledTableCell>
                  <StyledTableCell width="100px">Division</StyledTableCell>
                  <StyledTableCell width="160px">Released Credit Value</StyledTableCell>
                  <StyledTableCell width="160px">Purchase Order Type</StyledTableCell>
                  <StyledTableCell width="100px">Company Code</StyledTableCell>
                  <StyledTableCell width="160px">Order Creation Date</StyledTableCell>
                  <StyledTableCell width="160px">Order Creation Time</StyledTableCell>
                  <StyledTableCell width="100px">Credit Control Area</StyledTableCell>
                  <StyledTableCell width="160px">Sold To Party</StyledTableCell>
                  <StyledTableCell width="160px">Order Amount</StyledTableCell>
                  <StyledTableCell width="180px">Requested Delivery Date</StyledTableCell>
                  <StyledTableCell width="120px">Order Currency</StyledTableCell>
                  <StyledTableCell width="120px">Credit Status</StyledTableCell>
                  <StyledTableCell width="120px">Customer Number</StyledTableCell>
                  <StyledTableCell width="160px">Amount in USD</StyledTableCell>
                  <StyledTableCell width="160px">Unique Cust ID</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredInvoices
                ).map((invoice, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{invoice.slNo}</StyledTableCell>
                    <StyledTableCell>{invoice.customerOrderID}</StyledTableCell>
                    <StyledTableCell>{invoice.salesOrg}</StyledTableCell>
                    <StyledTableCell>{invoice.distributionChannel}</StyledTableCell>
                    <StyledTableCell>{invoice.division}</StyledTableCell>
                    <StyledTableCell>{invoice.releasedCreditValue}</StyledTableCell>
                    <StyledTableCell>{invoice.purchaseOrderType}</StyledTableCell>
                    <StyledTableCell>{invoice.companyCode}</StyledTableCell>
                    <StyledTableCell>{invoice.orderCreationDate}</StyledTableCell>
                    <StyledTableCell>{invoice.orderCreationTime}</StyledTableCell>
                    <StyledTableCell>{invoice.creditControlArea}</StyledTableCell>
                    <StyledTableCell>{invoice.soldToParty}</StyledTableCell>
                    <StyledTableCell>{invoice.orderAmount}</StyledTableCell>
                    <StyledTableCell>{invoice.requestedDeliveryDate}</StyledTableCell>
                    <StyledTableCell>{invoice.orderCurrency}</StyledTableCell>
                    <StyledTableCell>{invoice.creditStatus}</StyledTableCell>
                    <StyledTableCell>{invoice.customerNumber}</StyledTableCell>
                    <StyledTableCell>{invoice.amountInUsd}</StyledTableCell>
                    <StyledTableCell>{invoice.uniqueCustId}</StyledTableCell>
                  </StyledTableRow>
                ))}

                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 53 * emptyRows }}>
                    <StyledTableCell colSpan={19} />
                  </StyledTableRow>
                )}
              </TableBody>
            </StyledTable>
          )}
        </StyledTableContainer>
        {!isLoading && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredInvoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
            labelRowsPerPage="Rows per page"
            style={{ color: 'white' }}
          />
        )}
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

export default InvoiceTable;
