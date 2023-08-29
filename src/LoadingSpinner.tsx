import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg className="w-16 animate-spin" viewBox="0 0 50 50">
        <circle className="text-primary" r="20" cy="25" cx="25"></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
