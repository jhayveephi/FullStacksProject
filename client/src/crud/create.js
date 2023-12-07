import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create component for adding a new currency
const Create = () => {
  // State variables for handling form input and feedback
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const currencyData = { name, rate };

      // Check if the currency with the same name already exists
      const existingCurrency = await axios.get(`https://server-lke2.onrender.com/api/currencies/name/${name}`);
      if (existingCurrency.data && existingCurrency.data.length > 0) {
        // Currency already exists, show error message and clear the form
        setErrorMessage('Currency with this name already exists. Please choose a different name.');
        setName('');
        setRate('');
        return;
      }

      // Currency does not exist, proceed with creating it
      const response = await axios.post('https://server-lke2.onrender.com/api/currencies', currencyData);

      // Log the response and clear form inputs
      console.log('Response:', response.data);
      setName('');
      setRate('');
      setErrorMessage('');

      // Set the state to show the success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error creating currency:', error.response || error);
      setErrorMessage('Failed to create currency. Please try again.');
    }
  };

  // Function to handle the "Okay" button click in the success dialog
  const handleOkayClick = () => {
    // Use the navigate function to go to the '/rate/read' route
    navigate('/rate/read');
  };

  // Update the setName handler to ensure 3 uppercase letters
  const handleNameChange = (e) => {
    let newName = e.target.value.toUpperCase().slice(0, 3);
    setName(newName);
  };

  return (
    <div className="form-container">
      <h3>Create New Currency</h3>
      {/* Display error message if present */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* Show success dialog if currency created successfully */}
      {showSuccessDialog && (
        <div className="popup">
          <div className="popup-content">
            <p className="success-message">Currency created successfully!</p>
            <button onClick={handleOkayClick}>Okay</button>
          </div>
        </div>
      )}
      {/* Form for adding a new currency */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label">Currency Name: </label>
          {/* Input for currency name with handling for uppercase and length */}
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Currency Rate: </label>
          {/* Input for currency rate */}
          <input
            type="text"
            required
            className="form-control"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          {/* Submit button for creating a new currency */}
          <input
            type="submit"
            value="Create Currency"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
