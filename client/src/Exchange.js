import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Exchange = () => {
  // State variables to manage component state
  const [currencies, setCurrencies] = useState([]);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(null);
  const [selectedToCurrency, setSelectedToCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  // Fetch currencies from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/currencies')
      .then(response => {
        // Format currencies for react-select options
        const formattedCurrencies = response.data.map(currency => ({ value: currency.name, label: currency.name }));
        setCurrencies(formattedCurrencies);
      })
      .catch(error => console.error(error));
  }, []);

  // Handle currency selection change
  const handleCurrencyChange = (selectedOption, action) => {
    if (action.name === 'fromCurrency') {
      setSelectedFromCurrency(selectedOption);
    } else if (action.name === 'toCurrency') {
      setSelectedToCurrency(selectedOption);
    }
  };

  // Handle amount input change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle currency exchange button click
  const handleExchange = () => {
    if (selectedFromCurrency && selectedToCurrency && amount) {
      // Send a POST request to the server for currency conversion
      axios.post('http://localhost:5000/api/convert', {
        fromCurrency: selectedFromCurrency.label,
        toCurrency: selectedToCurrency.label,
        amount: amount
      })
        .then(response => setResult(`${amount} ${selectedFromCurrency.label} : ${response.data.result} ${selectedToCurrency.label}`))
        .catch(error => console.error(error));
    }
  };

  // Render the component UI
  return (
    <div className="exchange-form">
      {/* Select for choosing the "From" currency */}
      <div className="currency-select-container">
        <Select
          className="currency-select"
          options={currencies}
          onChange={(selectedOption) => handleCurrencyChange(selectedOption, { name: 'fromCurrency' })}
          value={selectedFromCurrency}
          placeholder="Select From Currency"
        />
      </div>
      {/* Select for choosing the "To" currency */}
      <div className="currency-select-container">
        <Select
          className="currency-select"
          options={currencies}
          onChange={(selectedOption) => handleCurrencyChange(selectedOption, { name: 'toCurrency' })}
          value={selectedToCurrency}
          placeholder="Select To Currency"
        />
      </div>
      {/* Input for entering the amount to exchange */}
      <div className="amount">
        <label className="amount-label">Amount:</label>
        <input type="number" placeholder="Enter amount" value={amount} onChange={handleAmountChange} className="amount-input" />
      </div>
      {/* Button to trigger the currency exchange */}
      <button onClick={handleExchange} className="exchange-button">Exchange</button>
      {/* Display the result of the currency exchange if available */}
      {result && <p className="result">{result}</p>}
    </div>
  );
};

export default Exchange;
