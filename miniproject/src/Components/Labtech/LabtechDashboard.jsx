import React, { useState } from 'react';
import Header from './LabtechHeader';
import Tabs from './LabtechTabs';

import './LabtechDashboard.css';
import Labtech from '../LabReport/LabReport';


const LabtechDashboard = () => {
  const [activeTab, setActiveTab] = useState('Add medical record');


  return (
    <div className="dashboard">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Add medical record' && (
          <div>
            {/* Content for Medical Records */}
            <h2>Add medical record</h2>
            <Labtech/>
          </div>
        )}
      </div>
  );
};

export default LabtechDashboard;