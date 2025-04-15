// src/components/Loading.jsx
import React from 'react';
import './Loading.css'; // We'll create this CSS file next

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
