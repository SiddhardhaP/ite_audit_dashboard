// frontend/src/components/icons/AzimuthIcon.tsx
import React from 'react';

const AzimuthIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L15.5 8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L8.5 15.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L8.5 8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L15.5 15.5" />
  </svg>
);

export default AzimuthIcon;
