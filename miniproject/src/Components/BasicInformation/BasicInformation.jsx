import React, { useState, useEffect } from 'react';
import './BasicInformation.css';
import axios from 'axios';

const PatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const storedPatientNumber = localStorage.getItem('loginKey');
  useEffect(() => {
    // Fetch patient details from backend API
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8800/patient' ,{
          params: {
            loginKey: storedPatientNumber // Replace 'YOUR_LOGIN_ID_HERE' with the actual loginId
          }
        });
        setPatientDetails(response.data);
        console.log(patientDetails)
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  return (
     <div className="patient-details-container">
      <div>
        <label htmlFor="loginId">Login Id:</label>
        <span>{patientDetails.loginId}</span>
      </div>
      <div>
        <label htmlFor="FirstName">First Name:</label>
        <span>{patientDetails.FirstName}</span>
      </div>
      <div>
        <label htmlFor="LastName">Last Name:</label>
        <span>{patientDetails.LastName}</span>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <span>{patientDetails.gender}</span>
      </div>
      <div>
        <label htmlFor="dateofbirth">Date of Birth:</label>
        <span>{patientDetails.dateOfBirth}</span>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <span>{patientDetails.Address}</span>
      </div>
      <div>
        <label htmlFor="City">City:</label>
        <span>{patientDetails.City}</span>
      </div>
      <div>
        <label htmlFor="State">State:</label>
        <span>{patientDetails.State}</span>
      </div>
      <div>
        <label htmlFor="Pincode">Pincode:</label>
        <span>{patientDetails.Pincode}</span>
      </div>
    </div>
  );
};

export default PatientDetails;