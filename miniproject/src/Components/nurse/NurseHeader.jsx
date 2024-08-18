import React from 'react';
import './NurseHeader.css';

const Header = ({ name, patientNumber }) => {
    const storedPatientNumber = localStorage.getItem('loginKey');
    
  const handleLogout = () => {
    // Clear loginKey and authToken from localStorage
    localStorage.removeItem('loginKey');
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="header">
      <div className="profile-info">
        <div>
          <h1>{name}</h1>
          <p>Patient number: {storedPatientNumber}</p>
        </div>
      </div>
      <div className="header-actions">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
