import React from 'react';

const Listing = ({ title, description }) => {
  return (
    <div className="listing">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Listing;
