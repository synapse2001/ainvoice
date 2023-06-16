import React from 'react';
import './App.css';

import InvoiceTable from './components/InvoiceTable';
import PopupSearch from './components/PopupSearch';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Invoices</h1>
      <div className="invoice-table-container">
        <InvoiceTable />
      </div>
    </div>
  );
}

export default App;
