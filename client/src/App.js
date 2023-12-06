import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './Home';
import Exchange from './Exchange';
import Team from './Team';
import Footer from './Footer';
import Rate from './Rate';
import Read from './crud/read'; 
import Create from './crud/create'; 
import Update from './crud/update';

function App() {
  return (
    <Router>
      {/* Container for the entire application */}
      <div className="container">
        {/* Navigation bar with NavLink components for different sections */}
        <nav>
          {/* NavLink for the Home section */}
          <NavLink to="/" activeClassName="active" end>
            Home
          </NavLink>
          {/* NavLink for the Exchange section */}
          <NavLink to="/exchange" activeClassName="active">
            Exchange
          </NavLink>
          {/* NavLink for the Team section */}
          <NavLink to="/team" activeClassName="active">
            Our Team
          </NavLink>
          {/* NavLink for the Rate section with nested NavLink for Read */}
          <NavLink to="/rate/read" activeClassName="active">
            Rate Management
          </NavLink>
        </nav>
        {/* Routes for rendering components based on the current URL */}
        <Routes>
          {/* Route for the Home component */}
          <Route path="/" element={<Home />} />
          {/* Route for the Exchange component */}
          <Route path="/exchange" element={<Exchange />} />
          {/* Route for the Team component */}
          <Route path="/team" element={<Team />} />
          {/* Route for the Rate component with nested routes for Read, Create, and Edit */}
          <Route path="/rate" element={<Rate />}>
            {/* Route for reading (displaying) currency rates */}
            <Route path="read" element={<Read />} />
            {/* Route for creating a new currency rate */}
            <Route path="create" element={<Create />} />
            {/* Route for updating (editing) an existing currency rate */}
            <Route path="update/:name" element={<Update />} />
          </Route>
        </Routes>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

// Exporting the App component as the default export
export default App;
