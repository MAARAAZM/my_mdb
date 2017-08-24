import React from 'react';
import './LoadIndicator.css';

const LoadIndicatorComponent = () => (
  <div className="LoadIndicator" style={{ background: '#b6b6b6 fixed url("./movie.jpg")' }}>
    <img
      className="LoadIndicator__Logo"
      src="./Logo.svg"
      alt="Logo"
    />
    Loading...
  </div>
);


export default LoadIndicatorComponent;
