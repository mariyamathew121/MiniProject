import React, { useState } from 'react';
import Header from './DoctorHeader';
import Tabs from './DoctorTabs';

import './DoctorDashboard.css';
import MedicalReport from '../MedicalReport/MedicalReport';
import GetRecord from './GetRecord';
import GetSummary from './GetSummary';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('View Medical Records');
  const handlePersonalDetailsSubmitSuccess = () => {
    setActiveTab('Basic Information');
  };

  return (
    <div className="dashboard">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {activeTab === 'View Medical Records' && (
          <div>
            {/* Content for Health History */}
            <h2>Medical Records</h2>
            <p>Details about the patient's medical records.</p>
            <GetRecord/>

          </div>
        )}
        {activeTab === 'View Summary' && (
          <div>
            {/* Content for Medical Records */}
            <h2>View Summary</h2>
            <p>Enter Details about the patient's basic information.</p>
            <GetSummary/>
          </div>
          
        )}
        {activeTab === 'Add medical record' && (
          <div>
            {/* Content for Medical Records */}
            <h2>Add medical record</h2>
            <MedicalReport/>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;