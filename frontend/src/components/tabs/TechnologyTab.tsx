// src/components/tabs/TechnologyTab.tsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import Card from '../ui/Card';
import NoData from '../ui/NoData';

interface TechnologyTabProps {
  siteId: string;
  setLoading: (isLoading: boolean) => void;
}

interface TechData {
  summary: string;
}

const TechnologyTab: React.FC<TechnologyTabProps> = ({ siteId, setLoading }) => {
  const [techData, setTechData] = useState<TechData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (siteId) {
      setError(null);
      apiClient.get(`/audit/technology/${siteId}`)
        .then(response => {
          setTechData(response.data);
        })
        .catch(error => {
          console.error('Error fetching technology data:', error);
          setError('Failed to fetch technology data.');
          setTechData(null);
        })
        .finally(() => setLoading(false));
    }
  }, [siteId, setLoading]);

  if (error) {
    return <NoData message={error} />;
  }

  if (!techData) {
    return <NoData />;
  }

  return (
    <Card>
        <h3>Technology Summary</h3>
        <div className="summary-box">
            <h4>Site Technology Mix</h4>
            <p>{techData.summary}</p>
        </div>
    </Card>
  );
};

export default TechnologyTab;
