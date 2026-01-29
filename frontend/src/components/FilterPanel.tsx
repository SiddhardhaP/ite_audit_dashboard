// frontend/src/components/FilterPanel.tsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import Card from './ui/Card';

interface FilterPanelProps {
  onSiteSelect: (siteId: string) => void;
  setLoading: (isLoading: boolean) => void;
}

interface Locations {
  districts: string[];
  tehsils: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onSiteSelect, setLoading }) => {
  const [locations, setLocations] = useState<Locations>({ districts: [], tehsils: [] });
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedTehsil, setSelectedTehsil] = useState<string>('');
  const [siteIdInput, setSiteIdInput] = useState<string>('');

  useEffect(() => {
    // Fetch locations for dropdowns
    apiClient.get('/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const handleSiteSearch = () => {
    if (siteIdInput) {
      setLoading(true);
      onSiteSelect(siteIdInput);
    }
  };

  const handleReset = () => {
    setSelectedDistrict('');
    setSelectedTehsil('');
    setSiteIdInput('');
    // Optionally, you could reset the main dashboard view here
    // onSiteSelect(''); 
  };
  
  // Note: The dropdowns for District/Tehsil are for show in this version,
  // as the primary search is by Site ID. A more advanced implementation
  // would populate a site dropdown based on these filters.

  return (
    <Card className="filter-panel">
      <div className="filter-group">
        <label htmlFor="district">District</label>
        <select id="district" onChange={e => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
          <option value="">All Districts</option>
          {locations.districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="tehsil">Tehsil</label>
        <select id="tehsil" onChange={e => setSelectedTehsil(e.target.value)} value={selectedTehsil}>
          <option value="">All Tehsils</option>
          {locations.tehsils.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="siteId">Site ID</label>
        <input 
            id="siteId"
            type="text" 
            placeholder="e.g., SITE_001" 
            value={siteIdInput}
            onChange={(e) => setSiteIdInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSiteSearch()}
        />
      </div>

      <div className="filter-buttons">
        <button className="search-button" onClick={handleSiteSearch}>Search</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
    </Card>
  );
};

export default FilterPanel;
