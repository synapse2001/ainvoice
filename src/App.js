import React from 'react';
import './App.css';

import InvoiceTable from './components/InvoiceTable';
import StaticInvoiceTable from './components/StaticInvoiceTable';
import PopupSearch from './components/PopupSearch';
import hrclogo from './resources/hrclogo.svg';
import abclogo from './resources/abclogo.svg';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
      <div className="logo-container">
        <img src={abclogo} alt="ABC Logo" className="abc-logo" />
        <h1 className="app-heading">Invoices List</h1>
        <img src={hrclogo} alt="HRC Logo" className="hrc-logo" />
        </div>
      </header>
      <div className="invoice-table-container">
        <InvoiceTable />
        {/* <StaticInvoiceTable/> */}
      </div>
      <footer className="footer">
        <p className="footer-text">
          <a href='https://www.highradius.com/privacy-policy/' target='blank'>Privacy Policy</a> | © HighRadius Corporation | All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App;