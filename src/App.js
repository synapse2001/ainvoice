import React from 'react';
import './App.css';

import InvoiceTable from './components/InvoiceTable';
import StaticInvoiceTable from './components/StaticInvoiceTable';
import PopupSearch from './components/PopupSearch';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Invoices</h1>
      <div className="invoice-table-container">
        <InvoiceTable />
        {/* <StaticInvoiceTable/> */}
      </div>
    </div>
  );
}

export default App;
