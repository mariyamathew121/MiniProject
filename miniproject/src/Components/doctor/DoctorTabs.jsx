import React from 'react';
import './DoctorTabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'View Medical Records' ? 'active' : ''}
        onClick={() => setActiveTab('View Medical Records')}
      >
        View Medical Records
      </button>
      <button
        className={activeTab === 'View Summary' ? 'active' : ''}
        onClick={() => setActiveTab('View Summary')}
      >
        View Summary
      </button>
      <button
        className={activeTab === 'Add medical record' ? 'active' : ''}
        onClick={() => setActiveTab('Add medical record')}
      >
        Add medical record
      </button>
    </div>
  );
};

export default Tabs;