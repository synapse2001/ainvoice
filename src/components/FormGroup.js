import React from 'react';
import { TextField, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const FormGroupFields = ({ searchFields, handleSearchFieldChange, handleCheckboxChange }) => {
  return (
    <FormGroup>
    <TextField
      label="Sl. No."
      name="slNo"
      value={searchFields.slNo}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.slNo === ''} onChange={handleCheckboxChange} name="slNo" />}
      label="Ignore"
    />

    <TextField
      label="Customer Order ID"
      name="customerOrderID"
      value={searchFields.customerOrderID}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.customerOrderID === ''} onChange={handleCheckboxChange} name="customerOrderID" />}
      label="Ignore"
    />

    <TextField
      label="Sales Org"
      name="salesOrg"
      value={searchFields.salesOrg}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.salesOrg === ''} onChange={handleCheckboxChange} name="salesOrg" />}
      label="Ignore"
    />

    <TextField
      label="Distribution Channel"
      name="distributionChannel"
      value={searchFields.distributionChannel}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.distributionChannel === ''} onChange={handleCheckboxChange} name="distributionChannel" />}
      label="Ignore"
    />

    <TextField
      label="Division"
      name="division"
      value={searchFields.division}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.division === ''} onChange={handleCheckboxChange} name="division" />}
      label="Ignore"
    />

    <TextField
      label="Released Credit Value"
      name="releasedCreditValue"
      value={searchFields.releasedCreditValue}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.releasedCreditValue === ''} onChange={handleCheckboxChange} name="releasedCreditValue" />}
      label="Ignore"
    />

    <TextField
      label="Purchase Order Type"
      name="purchaseOrderType"
      value={searchFields.purchaseOrderType}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.purchaseOrderType === ''} onChange={handleCheckboxChange} name="purchaseOrderType" />}
      label="Ignore"
    />

    <TextField
      label="Company Code"
      name="companyCode"
      value={searchFields.companyCode}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.companyCode === ''} onChange={handleCheckboxChange} name="companyCode" />}
      label="Ignore"
    />

    <TextField
      label="Order Creation Date"
      name="orderCreationDate"
      value={searchFields.orderCreationDate}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.orderCreationDate === ''} onChange={handleCheckboxChange} name="orderCreationDate" />}
      label="Ignore"
    />

    <TextField
      label="Order Creation Time"
      name="orderCreationTime"
      value={searchFields.orderCreationTime}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.orderCreationTime === ''} onChange={handleCheckboxChange} name="orderCreationTime" />}
      label="Ignore"
    />

    <TextField
      label="Credit Control Area"
      name="creditControlArea"
      value={searchFields.creditControlArea}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.creditControlArea === ''} onChange={handleCheckboxChange} name="creditControlArea" />}
      label="Ignore"
    />

    <TextField
      label="Sold To Party"
      name="soldToParty"
      value={searchFields.soldToParty}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.soldToParty === ''} onChange={handleCheckboxChange} name="soldToParty" />}
      label="Ignore"
    />

    <TextField
      label="Order Amount"
      name="orderAmount"
      value={searchFields.orderAmount}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.orderAmount === ''} onChange={handleCheckboxChange} name="orderAmount" />}
      label="Ignore"
    />

    <TextField
      label="Requested Delivery Date"
      name="requestedDeliveryDate"
      value={searchFields.requestedDeliveryDate}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.requestedDeliveryDate === ''} onChange={handleCheckboxChange} name="requestedDeliveryDate" />}
      label="Ignore"
    />

    <TextField
      label="Order Currency"
      name="orderCurrency"
      value={searchFields.orderCurrency}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.orderCurrency === ''} onChange={handleCheckboxChange} name="orderCurrency" />}
      label="Ignore"
    />

    <TextField
      label="Credit Status"
      name="creditStatus"
      value={searchFields.creditStatus}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.creditStatus === ''} onChange={handleCheckboxChange} name="creditStatus" />}
      label="Ignore"
    />

    <TextField
      label="Customer Number"
      name="customerNumber"
      value={searchFields.customerNumber}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.customerNumber === ''} onChange={handleCheckboxChange} name="customerNumber" />}
      label="Ignore"
    />

    <TextField
      label="Amount in USD"
      name="amountInUsd"
      value={searchFields.amountInUsd}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.amountInUsd === ''} onChange={handleCheckboxChange} name="amountInUsd" />}
      label="Ignore"
    />

    <TextField
      label="Unique Cust ID"
      name="uniqueCustId"
      value={searchFields.uniqueCustId}
      onChange={handleSearchFieldChange}
      fullWidth
    />
    <FormControlLabel
      control={<Checkbox checked={searchFields.uniqueCustId === ''} onChange={handleCheckboxChange} name="uniqueCustId" />}
      label="Ignore"
    />

  </FormGroup>
  );
};

export default FormGroupFields;
