// Rate.js
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';

// Rate component responsible for managing the "Exchange Rate" section
const Rate = () => {
  // State to store data fetched from the server
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('https://server-lke2.onrender.com/api/currencies')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-content crud">
      {/* Header for the "Exchange Rate" section */}
      <div className="crud-header group">
        <h2>Exchange Rate</h2>
        {/* Navigation links for Read and Create sub-routes */}
        <ul className="crud-nav">
          {/* NavLink for Read */}
          <li>
            <NavLink to="read">Read</NavLink>
          </li>
          {/* NavLink for Create */}
          <li>
            <NavLink to="create">Create</NavLink>
          </li>
        </ul>
      </div>
      {/* Use Outlet to render nested routes */}
      <Outlet data={data} />
    </div>
  );
};

export default Rate;
