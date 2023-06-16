import React, { Component } from 'react';
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)`
  display: flex;
  justify-content: center;
  align-items: center;

  & .MuiPaper-root {
    border-radius: 16px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CardContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  width: 400px;
`;

const ActionsContainer = styled(DialogActions)`
  display: flex;
  justify-content: flex-end;
`;

class PopupSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFields: {
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
      },
      selectedOptions: [],
      selectedOption: 'myfav', // Default option
    };
  }

  handleSearchFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      searchFields: {
        ...prevState.searchFields,
        [name]: value,
      },
    }));
  };

  handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    this.setState((prevState) => {
      const searchFields = { ...prevState.searchFields };
      const selectedOptions = [...prevState.selectedOptions];

      if (!selectedOptions.includes(selectedOption)) {
        selectedOptions.push(selectedOption);
      }

      return {
        selectedOptions,
        searchFields,
        selectedOption: 'myfav', 
      };
    });
  };

  handleSearch = () => {
    const { searchFields } = this.state;
    this.props.onSearch(searchFields);
    this.props.onClose();
  };

  render() {
    const { searchFields, selectedOptions, selectedOption } = this.state;
    const { isOpen, onClose } = this.props;

    return (
      <StyledDialog open={isOpen} onClose={onClose}>
        <CardContainer>
          <DialogTitle>Advanced Search</DialogTitle>
          <InputLabel>Select Option</InputLabel>
          <Select value={selectedOption} onChange={this.handleDropdownChange}>
            <MenuItem value="myfav" disabled>
              You can choose Multiple Option !
            </MenuItem>
            {Object.keys(searchFields).map((option) => (
              <MenuItem key={option} value={option} disabled={selectedOptions.includes(option)}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {selectedOptions.map((option) => (
            <TextField
              key={option}
              label={option}
              name={option}
              value={searchFields[option]}
              onChange={this.handleSearchFieldChange}
            />
          ))}
          <ActionsContainer>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={this.handleSearch} variant="contained" color="primary">
              Search
            </Button>
          </ActionsContainer>
        </CardContainer>
      </StyledDialog>
    );
  }
}

export default PopupSearch;
