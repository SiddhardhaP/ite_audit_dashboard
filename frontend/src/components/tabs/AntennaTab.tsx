// src/components/tabs/AntennaTab.tsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import Card from '../ui/Card';
import NoData from '../ui/NoData';

interface AntennaTabProps {
  siteId: string;
  setLoading: (isLoading: boolean) => void;
}

interface AntennaData {
  sector_id: string;
  antenna_height: number;
}

const AntennaTab: React.FC<AntennaTabProps> = ({ siteId, setLoading }) => {
  const [antennaData, setAntennaData] = useState<AntennaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (siteId) {
      setError(null);
      apiClient.get(`/audit/antenna/${siteId}`)
        .then(response => {
          setAntennaData(response.data);
        })
        .catch(error => {
          console.error('Error fetching antenna data:', error);
          setError('Failed to fetch antenna data.');
          setAntennaData([]);
        })
        .finally(() => setLoading(false));
    }
  }, [siteId, setLoading]);

  if (error) {
    return <NoData message={error} />;
  }

  if (!antennaData.length) {
    return <NoData />;
  }
  
  const heights = antennaData.map(d => d.antenna_height);
  const uniqueHeights = new Set(heights);
  const isMismatch = uniqueHeights.size > 1;

  return (
    <Card>
      <h3>Antenna Audit</h3>
      {isMismatch && <p className="warning">Warning: Antenna height mismatch detected across sectors!</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th title="A unique identifier for the physical sector of an antenna on a site.">Sector ID</th>
              <th title="The physical height of the antenna from the ground, in meters.">Antenna Height (m)</th>
            </tr>
          </thead>
          <tbody>
            {antennaData.map(row => (
              <tr key={row.sector_id}>
                <td>{row.sector_id}</td>
                <td className={isMismatch && heights.filter(h => h === row.antenna_height).length > 0 ? 'mismatch' : ''}>
                  {row.antenna_height}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AntennaTab;
