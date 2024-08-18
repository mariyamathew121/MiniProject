import React, { useState } from 'react';
import Header from './NurseHeader';
import Tabs from './NurseTabs';

import './NurseDashboard.css';
import MedicalReport from '../MedicalReport/MedicalReport';


const NurseDashboard = () => {
  const [activeTab, setActiveTab] = useState('Add medical record');


  return (
    <div className="dashboard">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Add medical record' && (
          <div>
            {/* Content for Medical Records */}
            <h2>Add medical record</h2>
            <MedicalReport/>
          </div>
        )}
      </div>
  );
};

export default NurseDashboard;