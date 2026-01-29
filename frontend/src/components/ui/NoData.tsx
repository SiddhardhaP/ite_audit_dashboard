// frontend/src/components/ui/NoData.tsx
import React from 'react';

const NoData: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6B7280' }}>
      <p>{message || 'No data found for the selected criteria.'}</p>
    </div>
  );
};

export default NoData;
