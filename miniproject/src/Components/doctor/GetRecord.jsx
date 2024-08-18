import React, { useState } from 'react';
import axios from 'axios';

const GetRecord = () => {
  const [formData, setFormData] = useState({ loginId: "" });
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
    try {
      const response = await axios.get('http://localhost:8800/patients', {
        params: {
          loginKey: formData.loginId
        }
      });

      if (response.data.length > 0) {
        setPatientDetails(response.data[0]);
        setError("");  // Clear any previous error
      } else {
        setError("Patient ID does not exist.");
        setPatientDetails(null);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError("An error occurred while fetching patient details.");
      setPatientDetails(null);
    }
  };

  return (
    <div className="container">
      {patientDetails ? (
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
      ) : (
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="loginId">Patient Id:</label>
          <input
            type="text"
            name="loginId"
            id="loginId"
            value={formData.loginId}
            onChange={handleChange}
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">Submit</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default GetRecord;
