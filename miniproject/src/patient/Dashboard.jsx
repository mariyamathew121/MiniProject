import React, { useState } from 'react';
import Header from './Header';
import Tabs from './Tabs';
import PersonalDetails from '../Components/PersonalDetails/PersonalDetails';
import PatientDetails from '../Components/BasicInformation/BasicInformation';
import MedicalRecords from '../Components/MedicalRecords/MedicalRecords';
import './Dasboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Basic Information');
  const handlePersonalDetailsSubmitSuccess = () => {
    setActiveTab('Basic Information');
  };

  return (
    <div className="dashboard">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {activeTab === 'Basic Information' && (
          <div>
            {/* Content for Basic Information */}
            <h2>Basic Information</h2>
            <p>Details about the patient's basic information.</p>
            <PatientDetails/>
          </div>
        )}
        {activeTab === 'Health History' && (
          <div>
            {/* Content for Health History */}
            <h2>Medical Records</h2>
            <p>Details about the patient's medical records.</p>
                 <MedicalRecords/>
          </div>
        )}
        {activeTab === 'Update Personal Information' && (
          <div>
            {/* Content for Medical Records */}
            <h2>Update Personal Information</h2>
            <p>Enter Details about the patient's basic information.</p>
            <PersonalDetails onSubmitSuccess={handlePersonalDetailsSubmitSuccess}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;