import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Currency component for rendering individual currency rows
const Currency = (props) => (
  <tr className="d-flex">
    <td className="col-5">{props.name}</td>
    <td className="col-5">{props.rate}</td>
    <td className="col-2" style={{ textAlign: 'right' }}>
      {/* Edit and Delete buttons */}
      <button className="edit-button" onClick={() => props.updateCurrency(props.name)}>
        Edit
      </button>
      <button className="delete-button" onClick={() => props.deleteCurrency(props.name)}>
        Delete
      </button>
    </td>
  </tr>
);

// Read component for displaying and managing currency data
const Read = () => {
  // State variables for handling currency data and search term
  const [currencies, setCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch currencies from the server
  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/currencies');
      // Sort currencies alphabetically by name
      const sortedCurrencies = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCurrencies(sortedCurrencies);
    } catch (error) {
      console.log('Error fetching currencies:', error);
    }
  };

  // useEffect to fetch currencies when the component mounts
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Function to delete a currency
  const deleteCurrency = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/api/currencies/deleteByName/${name}`);
      console.log('Currency deleted from DB:', name);

      // Update the state to remove the deleted currency
      setCurrencies((prevCurrencies) =>
        prevCurrencies.filter((el) => el.name !== name)
      );
    } catch (error) {
      console.log('Error deleting currency:', error);
    }
  };

  // Function to update a currency (navigate to the update route)
  const updateCurrency = (name) => {
    console.log('Updating currency:', name);
    navigate(`/rate/update/${name}`);
  };

  // Function to handle search based on the input term
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      // If the search term is empty, fetch the complete list of currencies
      fetchCurrencies();
    } else {
      // Filter currencies based on the search term
      const filteredCurrencies = currencies.filter((currency) =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCurrencies(filteredCurrencies);
    }
  };

  // Function to handle input change in the search bar
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h3>Currencies</h3>
      {/* Search form with input and button */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by currency name"
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {/* Table for displaying currency data */}
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Currency Name</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through currencies and render Currency component for each */}
          {currencies.map((currency) => (
            <Currency
              name={currency.name}
              rate={currency.rate}
              key={currency.name}
              updateCurrency={updateCurrency}
              deleteCurrency={deleteCurrency}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
