import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  // Get the currency name from the URL params
  const { name } = useParams();
  // Navigate function for redirection
  const navigate = useNavigate();

  // State variables for currency data and messages
  const [currency, setCurrency] = useState({ name: '', rate: 0 });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // useEffect to fetch the currency data when the component mounts
  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/currencies/name/${name}`);
        // Set the currency state with the fetched data
        setCurrency(response.data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, [name]);

  // Function to handle currency update
  const updateCurrency = async (e) => {
    e.preventDefault();
    // Prepare the updated currency data
    const updatedCurrency = { name: currency.name, rate: currency.rate };

    try {
      // Send a PUT request to update the currency
      const res = await axios.put(`http://localhost:5000/api/currencies/updateByName/${name}`, updatedCurrency);
      // Set success message and show success dialog
      setSuccessMessage(`Currency "${name}" updated successfully!`);
      setErrorMessage('');
      setShowSuccessDialog(true);
      // Do not navigate automatically after successful update

    } catch (error) {
      console.error('Update failed:', error);
      // Set error message in case of failure
      setErrorMessage('Failed to update currency. Please try again.');
      setSuccessMessage('');
    }
  };

  // Function to handle the 'Okay' button click in the success dialog
  const handleOkayClick = () => {
    // Close the success dialog
    setShowSuccessDialog(false);
    // Navigate to /rate/read after closing the popup
    navigate('/rate/read');
  };

  return (
    <div className="form-container">
      <h3>Update Currency</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {showSuccessDialog && (
        // Success dialog displayed upon successful update
        <div className="popup">
          <div className="popup-content">
            <p>{successMessage}</p>
            <button onClick={handleOkayClick}>Okay</button>
          </div>
        </div>
      )}
      <form onSubmit={updateCurrency}>
        <div className="form-group">
          <label className="form-label">Currency Name: </label>
          {/* Display the currency name (disabled for editing) */}
          <input
            type="text"
            value={name}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Currency Rate: </label>
          {/* Input field for updating the currency rate */}
          <input
            type="text"
            value={currency.rate}
            onChange={(e) => setCurrency({ ...currency, rate: e.target.value })}
            className="form-control"
          />
        </div>
        <br />
        <div className="form-group">
          {/* Submit button for updating the currency */}
          <button type="submit" className="btn btn-primary">
            Update Currency
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
