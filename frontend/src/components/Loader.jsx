import React from 'react';

const Loader = ({ message = "Crafting your brand identity..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="loader-text">{message}</div>
    </div>
  );
};

export default Loader;
