import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { currencies } from './currency.ts';
import React, { useState, useCallback } from 'react';
import './App.css';

export function Api(currency){
  const apiKey = 'c448823daaa36f8553337a08'; 
  const apiUrl = `https://v6.exchangerate-api.com/v6/c448823daaa36f8553337a08/latest/USD`;
  return axios.get(apiUrl);
}

function App() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [amount, setAmount] = useState(1); 

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value); 
  };

  const convertCurrency = useCallback(async () => {
    try {
      const response = await Api();
      const rates = response.data.conversion_rates;
      if (fromCurrency && toCurrency) {
        const rate = rates[toCurrency] / rates[fromCurrency];
        setExchangeRate(rate);
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div>
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
          <h1>Exchange Rate Converter</h1>
          <p>Author: Ali Huseynli</p>
        </div>
      <div className='App'>
        <div>
          <TextField label="Amount" type="number" value={amount} onChange={handleAmountChange} />
        </div>

        <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fromCurrency}
              label="Currency"
              onChange={handleFromCurrencyChange}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <Button variant="contained" color="primary" onClick={convertCurrency}>
            Convert
          </Button>
        </div>

        <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={toCurrency}
              label="Currency"
              onChange={handleToCurrencyChange}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          {exchangeRate && (
            <div>
              <p>Converted Amount: {(amount * exchangeRate).toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
