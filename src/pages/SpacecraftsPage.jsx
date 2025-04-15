import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../Components/Loading";

const SpacecraftsPage = () => {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/spacecrafts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSpacecrafts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching spacecrafts:', error);
        setError('Failed to load spacecrafts. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  // Updated handleDecommission function with DELETE request
  const handleDecommission = (id) => {
    if (window.confirm("Are you sure you want to decommission this spacecraft?")) {
      fetch(`http://localhost:3001/spacecrafts/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          // Update local state to remove the spacecraft
          setSpacecrafts(prev => prev.filter(spacecraft => spacecraft.id !== id));
        })
        .catch(error => {
          console.error('Error decommissioning spacecraft:', error);
          alert('Failed to decommission spacecraft. Please try again later.');
        });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="spacecrafts-page container">
      <h1>Spacecrafts</h1>
      <nav>
        <Link to="/spacecrafts/new" className="button">Build New Spacecraft</Link>
      </nav>
      <ul className="spacecraft-list">
        {spacecrafts.map((spacecraft) => (
          <li key={spacecraft.id} className="spacecraft-item">
            <Link to={`/spacecraft/${spacecraft.id}`} className="spacecraft-link">
              {spacecraft.name}
            </Link>
            {spacecraft.image && (
              <img
                src={spacecraft.image}
                alt={spacecraft.name}
                style={{ maxWidth: '150px', display: 'block', margin: '1rem auto' }}
              />
            )}
            <p>Capacity: {spacecraft.capacity}</p>
            <p>Status: {spacecraft.status}</p>
            <button 
              onClick={() => handleDecommission(spacecraft.id)}
              className="decommission-button"
              aria-label={`Decommission ${spacecraft.name}`}
            >
              Decommission
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpacecraftsPage;
