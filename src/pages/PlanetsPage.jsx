// src/pages/PlanetsPage.jsx
import React, { useState, useEffect } from 'react';
import '../index.css';
import Loading from "../Components/Loading"; // Ensure casing is correct

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch planets and spacecrafts concurrently
    Promise.all([
      fetch('http://localhost:3001/planets').then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3001/spacecrafts').then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
    ])
      .then(([planetsData, spacecraftsData]) => {
        setPlanets(planetsData);
        setSpacecrafts(spacecraftsData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load planets and spacecrafts. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  // When a spacecraft image is clicked, select that spacecraft.
  const handleSelectSpacecraft = (spacecraftId, e) => {
    // Prevent the click from bubbling up to the planet container.
    e.stopPropagation();
    setSelectedSpacecraftId(spacecraftId);
  };

  // When a planet is clicked, if a spacecraft is selected, move it to this planet.
  const handlePlanetClick = (planetId) => {
    if (selectedSpacecraftId === null) {
      alert("Please select a spacecraft first by clicking its image.");
      return;
    }
    // Update local state for spacecrafts by setting the selected spacecraft's currentPlanet to the clicked planet id.
    setSpacecrafts(prevSpacecrafts =>
      prevSpacecrafts.map(sc =>
        sc.id === selectedSpacecraftId ? { ...sc, currentPlanet: Number(planetId) } : sc
      )
    );
    // Optionally, here you could also send a PATCH request to your API to persist the change.
    // After updating, clear the selected spacecraft.
    setSelectedSpacecraftId(null);
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="planets-page container">
      <h1 className="planets-title">Planets</h1>
      <div className="planet-list">
        {planets.map((planet) => {
          // For each planet, find the spacecrafts whose currentPlanet matches the planet's id.
          const stationedSpacecrafts = spacecrafts.filter(
            sc => Number(sc.currentPlanet) === Number(planet.id)
          );
          return (
            <div
              className="planet-row"
              key={planet.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePlanetClick(planet.id)}
            >
              <img
                className="planet-image"
                src={planet.image || "/images/default-planet.jpg"}
                alt={planet.name}
              />
              <div className="planet-info">
                <h3>{planet.name}</h3>
                <p>Stationed Spacecraft:</p>
                {stationedSpacecrafts.length > 0 ? (
                  <ul>
                    {stationedSpacecrafts.map((sc) => (
                      <li key={sc.id} style={{ cursor: 'pointer' }}>
                        {/* Display the spacecraft image with an onClick to select it */}
                        {sc.image ? (
                          <img
                            src={sc.image}
                            alt={sc.name}
                            style={{
                              maxWidth: '80px',
                              display: 'block',
                              margin: '0 auto',
                              border: selectedSpacecraftId === sc.id ? '2px solid yellow' : 'none'
                            }}
                            onClick={(e) => handleSelectSpacecraft(sc.id, e)}
                          />
                        ) : (
                          <div
                            style={{
                              width: '80px',
                              height: '80px',
                              margin: '0 auto',
                              backgroundColor: '#444',
                              border: selectedSpacecraftId === sc.id ? '2px solid yellow' : 'none'
                            }}
                            onClick={(e) => handleSelectSpacecraft(sc.id, e)}
                          >
                            No Image
                          </div>
                        )}
                        <span>{sc.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No spacecraft stationed here.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedSpacecraftId && (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Selected spacecraft ID: {selectedSpacecraftId}. Now click on a planet to move it.
        </p>
      )}
    </div>
  );
};

export default PlanetsPage;
