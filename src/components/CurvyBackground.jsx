import React from 'react';

const CurvyBackground = () => (
  <div className="curvy-line">
    <svg viewBox="0 0 800 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M-50 150C150 100 300 400 350 600C400 800 200 1000 400 1150C600 1300 850 1000 850 800" 
        stroke="#d946ef" 
        strokeWidth="100" 
        strokeLinecap="round" 
        style={{ opacity: 0.3 }}
      />
    </svg>
  </div>
);

export default CurvyBackground;
