import React from 'react';
import './NurseTabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
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