// src/pages/SpacecraftPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from "../Components/Loading"; // Ensure your Components folder is correctly cased

const SpacecraftPage = () => {
  const { id } = useParams(); // Get the spacecraft ID from the URL
  const [spacecraft, setSpacecraft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch spacecraft details by ID from the json-server endpoint
    fetch(`http://localhost:3001/spacecrafts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSpacecraft(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching spacecraft details:', error);
        setError('Failed to load spacecraft details. Please try again later.');
        setIsLoading(false);
      });
  }, [id]);

  // Render the Loading component if data is still being fetched
  if (isLoading) return <Loading />;
  
  // Render an error message if an error occurred during fetching
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="spacecraft-details container">
      <Link to="/spacecrafts" className="back-button">← Back to Spacecrafts</Link>
      <h1>{spacecraft.name}</h1>
      
      {/* Conditionally render the image if it exists, centered using inline styles */}
      {spacecraft.image && (
        <img
          src={spacecraft.image}
          alt={spacecraft.name}
          style={{ maxWidth: '150px', display: 'block', margin: '1rem auto' }}
        />
      )}
      
      <p><strong>Capacity:</strong> {spacecraft.capacity}</p>
      <p><strong>Description:</strong> {spacecraft.description}</p>
      <p><strong>Status:</strong> {spacecraft.status}</p>
    </div>
  );
};

export default SpacecraftPage;
