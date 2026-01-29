// frontend/src/components/icons/TechnologyIcon.tsx
import React from 'react';

const TechnologyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H15V9H9V3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9H9V15H3V9Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9H21V15H15V9Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15H15V21H9V15Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 9H3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 15H3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9H21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 15H21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17V21" />
  </svg>
);

export default TechnologyIcon;
