// src/components/tabs/AzimuthTab.tsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import Card from '../ui/Card';
import NoData from '../ui/NoData';

interface AzimuthTabProps {
  siteId: string;
  setLoading: (isLoading: boolean) => void;
}

interface AzimuthData {
  sector_id: string;
  azimuth: number;
  deviation: number | null;
}

const AzimuthTab: React.FC<AzimuthTabProps> = ({ siteId, setLoading }) => {
  const [azimuthData, setAzimuthData] = useState<AzimuthData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (siteId) {
      setError(null);
      apiClient.get(`/audit/azimuth/${siteId}`)
        .then(response => {
          setAzimuthData(response.data);
        })
        .catch(error => {
          console.error('Error fetching azimuth data:', error);
          setError('Failed to fetch azimuth data.');
          setAzimuthData([]);
        })
        .finally(() => setLoading(false));
    }
  }, [siteId, setLoading]);

  if (error) {
    return <NoData message={error} />;
  }

  if (!azimuthData.length) {
    return <NoData />;
  }

  return (
    <Card>
      <h3>Azimuth Analysis</h3>
      <p style={{marginTop: '-1rem', marginBottom: '1.5rem', color: 'var(--text-color-light)'}}>
        Compares sector azimuths against an ideal 120° separation.
      </p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th title="A unique identifier for the physical sector of an antenna on a site.">Sector ID</th>
              <th title="The horizontal direction the antenna is facing, in degrees from North.">Azimuth (°)</th>
              <th title="The deviation in degrees from the expected separation between this sector and the next.">Deviation (°)</th>
            </tr>
          </thead>
          <tbody>
            {azimuthData.map(row => (
              <tr key={row.sector_id}>
                <td>{row.sector_id}</td>
                <td className="center-align">{row.azimuth}</td>
                <td className="center-align">{row.deviation?.toFixed(2) ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AzimuthTab;
