import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to SpaceTravel</h1>
      <p>Manage spacecraft and evacuate humanity to other habitable planets.</p>

      {/* Button container with Flexbox layout */}
      <div className="page-card-container">
        {/* View Spacecraft */}
        <div className="page-card">
          <h3>View Spacecraft</h3>
          <Link to="/spacecrafts" className="button">Go to Spacecrafts</Link>
        </div>

        {/* View Planets */}
        <div className="page-card">
          <h3>View Planets</h3>
          <Link to="/planets" className="button">Go to Planets</Link>
        </div>
      </div>

      {/* Home Button */}
      <div className="page-card">
        <h3>Home</h3>
        <Link to="/" className="button button-home">Go to Home</Link>
      </div>

      {/* Optional Footer */}
      <footer>
        <p>SpaceTravel &copy; 2025 | All rights reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
