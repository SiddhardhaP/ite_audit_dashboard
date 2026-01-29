// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import BandsTab from '../components/tabs/BandsTab';
import AntennaTab from '../components/tabs/AntennaTab';
import AzimuthTab from '../components/tabs/AzimuthTab';
import TechnologyTab from '../components/tabs/TechnologyTab';
import FilterPanel from '../components/FilterPanel';
import { BandsIcon, AntennaIcon, AzimuthIcon, TechnologyIcon } from '../components/icons';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bands');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('SITE_001'); // Default site for demo
  const [loading, setLoading] = useState<boolean>(false);

  const handleSiteSelection = (siteId: string) => {
    setSelectedSiteId(siteId);
    // The loading state is set to true in the FilterPanel, 
    // and will be set to false by the individual tabs when their data fetch completes.
  };

  const renderTabContent = () => {
    if (!selectedSiteId) {
      return <p>Please select a site to view audit results.</p>;
    }
    switch (activeTab) {
      case 'bands':
        return <BandsTab siteId={selectedSiteId} setLoading={setLoading} />;
      case 'antenna':
        return <AntennaTab siteId={selectedSiteId} setLoading={setLoading} />;
      case 'azimuth':
        return <AzimuthTab siteId={selectedSiteId} setLoading={setLoading} />;
      case 'technology':
        return <TechnologyTab siteId={selectedSiteId} setLoading={setLoading} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <FilterPanel onSiteSelect={handleSiteSelection} setLoading={setLoading} />
      
      <div className="tabs">
        <button onClick={() => setActiveTab('bands')} className={activeTab === 'bands' ? 'active' : ''}>
          <BandsIcon className="icon" />
          <span>Bands</span>
        </button>
        <button onClick={() => setActiveTab('antenna')} className={activeTab === 'antenna' ? 'active' : ''}>
          <AntennaIcon className="icon" />
          <span>Antenna</span>
        </button>
        <button onClick={() => setActiveTab('azimuth')} className={activeTab === 'azimuth' ? 'active' : ''}>
          <AzimuthIcon className="icon" />
          <span>Azimuth</span>
        </button>
        <button onClick={() => setActiveTab('technology')} className={activeTab === 'technology' ? 'active' : ''}>
          <TechnologyIcon className="icon" />
          <span>Technology</span>
        </button>
      </div>

      <div className="tab-content" style={{ position: 'relative' }}>
        {loading && (
          <div className="loading-overlay">
            <Spinner />
          </div>
        )}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
