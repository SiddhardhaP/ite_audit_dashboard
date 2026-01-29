// frontend/src/components/icons/AntennaIcon.tsx
import React from 'react';

const AntennaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L12 8L18 2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V22" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14H15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 18H17" />
  </svg>
);

export default AntennaIcon;
