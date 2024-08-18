import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'Basic Information' ? 'active' : ''}
        onClick={() => setActiveTab('Basic Information')}
      >
        Basic Information
      </button>
      <button
        className={activeTab === 'Health History' ? 'active' : ''}
        onClick={() => setActiveTab('Health History')}
      >
        Medical Records
      </button>
      <button
        className={activeTab === 'Update Personal Information' ? 'active' : ''}
        onClick={() => setActiveTab('Update Personal Information')}
      >
        Update Personal Information
      </button>
    </div>
  );
};

export default Tabs;