// src/pages/SpacecraftConstructionPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpacecraftConstructionPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields (pictureUrl is optional)
    if (!name || !capacity || !description) {
      setError('Name, capacity, and description are required.');
      return;
    }
    if (isNaN(capacity) || Number(capacity) <= 0) {
      setError('Capacity must be a positive number.');
      return;
    }

    // Create a new spacecraft object, assigning it to Earth by default (assuming Earth id is 3)
    const newSpacecraft = {
      name,
      capacity: Number(capacity),
      description,
      image: pictureUrl,
      status: 'Operational',
      currentPlanet: 3  // Default: assign to Earth
    };

    // Send a POST request to add the new spacecraft to your API
    fetch('http://localhost:3001/spacecrafts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSpacecraft)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Created new spacecraft:', data);
        setError('');
        // Navigate back to the spacecrafts page after creation.
        navigate('/spacecrafts');
      })
      .catch(error => {
        console.error('Error creating spacecraft:', error);
        setError('Failed to create spacecraft. Please try again later.');
      });
  };

  return (
    <div className="spacecraft-construction container">
      <h1>Create New Spacecraft</h1>
      <form onSubmit={handleSubmit} className="construction-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter spacecraft name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            placeholder="Enter capacity"
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            placeholder="Enter spacecraft description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pictureUrl">Picture URL:</label>
          <input
            type="text"
            id="pictureUrl"
            value={pictureUrl}
            placeholder="Enter picture URL (optional)"
            onChange={(e) => setPictureUrl(e.target.value)}
          />
        </div>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="button">Create</button>
      </form>
      {/* Back Button: Navigate directly to the spacecrafts page */}
      <button onClick={() => navigate('/spacecrafts')} className="button button-home">
        Back
      </button>
    </div>
  );
};

export default SpacecraftConstructionPage;
