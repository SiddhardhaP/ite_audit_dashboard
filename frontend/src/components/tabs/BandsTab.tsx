// src/components/tabs/BandsTab.tsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import BandPieChart from '../../charts/BandPieChart';
import Card from '../ui/Card';
import NoData from '../ui/NoData';

interface BandsTabProps {
  siteId: string;
  setLoading: (isLoading: boolean) => void;
}

interface BandData {
  sector_id: string;
  unique_bands: number;
  bands: string[];
}

const BandsTab: React.FC<BandsTabProps> = ({ siteId, setLoading }) => {
  const [bandData, setBandData] = useState<BandData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (siteId) {
      // setLoading(true) is called in the parent component
      setError(null);
      apiClient.get(`/audit/bands/${siteId}`)
        .then(response => {
          setBandData(response.data);
        })
        .catch(error => {
          console.error('Error fetching band data:', error);
          setError('Failed to fetch band data. Please check the Site ID and try again.');
          setBandData([]); // Clear previous data on error
        })
        .finally(() => setLoading(false));
    }
  }, [siteId, setLoading]);

  if (error) {
    return <NoData message={error} />;
  }
  
  if (!bandData.length) {
    return <NoData />;
  }

  const pieData = bandData.flatMap(d => d.bands).reduce((acc, band) => {
    const existing = acc.find(item => item.name === band);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: band, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="analysis-layout">
      <Card className="table-container">
        <h3>Band Analysis</h3>
        <table>
          <thead>
            <tr>
              <th title="A unique identifier for the physical sector of an antenna on a site.">Sector ID</th>
              <th title="The total count of unique LTE bands operating on this sector.">No. of Bands</th>
              <th title="The specific LTE bands deployed on this sector (e.g., Band 3, Band 40).">Bands Deployed</th>
            </tr>
          </thead>
          <tbody>
            {bandData.map(row => (
              <tr key={row.sector_id}>
                <td>{row.sector_id}</td>
                <td className="center-align">{row.unique_bands}</td>
                <td>{row.bands.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="chart-container">
        <h3>Band Distribution</h3>
        <BandPieChart data={pieData} />
      </Card>
    </div>
  );
};

export default BandsTab;
