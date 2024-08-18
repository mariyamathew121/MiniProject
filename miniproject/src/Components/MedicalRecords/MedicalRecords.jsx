import React, { useState, useEffect } from 'react';
import './MedicalRecords.css';
import axios from 'axios';




const PatientRecords = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const storedPatientNumber = localStorage.getItem('loginKey');
  useEffect(() => {
    // Fetch patient details from backend API
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8800/patients' ,{
          params: {
            loginKey: storedPatientNumber // Replace 'YOUR_LOGIN_ID_HERE' with the actual loginId
          }
        });
        setPatientDetails(response.data[0]);
        console.log(response.data[0])

      } catch (error) {
        console.error('Error fetching patient details :', error);
      }
    };

    fetchPatientDetails();
  }, []);


return (
    <div className="patient-details-container">
    <div>
      <label htmlFor="loginId">Login Id :</label>
      <span>{patientDetails.loginId}</span>
    </div>
    <div>
      <label htmlFor="gender">gender :</label>
      <span>{patientDetails.gender}</span>
    </div>
    <div>
      <label htmlFor="fullName">full Name :</label>
      <span>{patientDetails.fullName}</span>
    </div>
    <div>
      <label htmlFor="dateOfBirth">date Of Birth :</label>
      <span>{patientDetails.dateOfBirth}</span>
    </div>
    <div>
      <label htmlFor="MedicalConditions">Medical Conditions :</label>
      <span>{patientDetails.MedicalConditions}</span>
    </div>
    <div>
      <label htmlFor="Treatments">Treatments :</label>
      <span>{patientDetails.Treatments}</span>
    </div>
    <div>
      <label htmlFor="Doctor">Doctor :</label>
      <span>{patientDetails.Doctor}</span>
    </div>
    <div>
      <label htmlFor="diagnosis">diagnosis :</label>
      <span>{patientDetails.diagnosis}</span>
    </div>
    <div>
      <label htmlFor="Vitals">Vitals :</label>
      <span>{patientDetails.Vitals}</span>
    </div>
    <div>
      <label htmlFor="LabTest">Lab Test :</label>
      <span>{patientDetails.LabTest}</span>
    </div>

    





  </div>
);
};

export default PatientRecords;