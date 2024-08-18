import React, { useState } from 'react';
import axios from 'axios';
import './GetSummary.css';

const GetSummary = () => {
  const [formData, setFormData] = useState({ loginId: "" });
  const [patientDetails, setPatientDetails] = useState(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8800/patients', {
        params: {
          loginKey: formData.loginId
        }
      });

      if (response.data.length > 0) {
        setPatientDetails(response.data[0]);
        console.log(response.data[0])
        setError("");  // Clear any previous error
        const summaryPrompt = generateSummaryPrompt(response.data[0]); // Generate summary prompt using patient details
        if (summaryPrompt) {
          const summaryResponse = await axios.post('http://localhost:8800/generate-summary', { patientData: response.data[0] });
          setSummary(summaryResponse.data.summary);
        } else {
          setError("Failed to generate summary prompt.");
          setSummary("");
        }
      } else {
        setError("Patient ID does not exist.");
        setPatientDetails(null);
        setSummary("");
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError("An error occurred while fetching patient details.");
      setPatientDetails(null);
      setSummary("");
    }
  };

  // Function to generate summary prompt using patient details
  const generateSummaryPrompt = (patientDetails) => {
    // Customize this function to generate a summary prompt based on patient details
    if (patientDetails) {
      // Example: "Generate a medical summary for patient [Full Name] with [Medical Conditions], [Treatments], etc."
      const bio = " ";
      return `Generate a new medical summary paragraph of ${bio} by also taking the info from each key(except for "_id") in the row of the same patient having the dictionary ${JSON.stringify(patientDetails)}.make sure that you do not add any information on your own and only work with information you are given`;
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      {patientDetails ? (
        <div className="patient-details-container">
          {/* Display patient details */}
          {/* Code for displaying patient details goes here */}
          <div>
            <label htmlFor="summary">Summary :</label>
            <p>{summary}</p>
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

export default GetSummary;
