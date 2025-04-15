// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // We'll add some basic styles

const Header = () => {
  return (
    <header className="site-header">
      <nav className="navigation">
        <Link to="/" className="nav-item">
          <img src="https://images.template.net/465777/Simple-House-Clipart-edit-online.png" alt="Home" className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/spacecrafts" className="nav-item">
          <img src="https://media.istockphoto.com/id/1249611748/vector/rocket-space-ship-launch.jpg?s=612x612&w=0&k=20&c=DMZ7gUIzBd34YjINjw_PKoLnos6Iq3VCqK3OYA-Uzsc=" alt="Spacecrafts" className="nav-icon" />
          <span>Spacecrafts</span>
        </Link>
        <Link to="/planets" className="nav-item">
          <img src="https://img.freepik.com/free-vector/planets-flat-style_78370-2890.jpg" alt="Planets" className="nav-icon" />
          <span>Planets</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
