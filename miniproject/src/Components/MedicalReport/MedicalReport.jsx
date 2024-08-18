import React, { useState,useEffect } from 'react';
import './MedicalReport.css'; // Import your CSS file
import axios from 'axios';
const MedicalReport = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    Doctor: '',
    diagnosis: '',
    Treatments: '',
    Vitals: '',
    LabTest: '',
    loginId:''
    // Add more form fields here (e.g., medical history, diagnosis)
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // Check if any of the required fields are empty
    const requiredFields = ['fullName', 'dateOfBirth', 'gender', 'Doctor', 'diagnosis', 'Treatments', 'Vitals', 'LabTest', 'loginId'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
  
    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }
  
    const token = localStorage.getItem('authToken');
    const loginKey = localStorage.getItem('loginId');
    console.log(loginKey);
    console.log('Form Data:', formData);
  
    if (!token) {
      alert('You must be logged in to submit this form.');
      window.location.href = '/login'; // Redirect to login page if not logged in
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8800/MDF', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };
  

  return (
    <div className="container2">
      <div className="header1">
        <div className="text1">Medical Report Form</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="half">
          <label htmlFor="fullName">Patient's Full Name</label>
          <input  className='inputfield'
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="half">
          <label htmlFor="gender">Gender</label>
          <select className='inputfield'
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="half">
          <label htmlFor="dateOfBirth">Date of Birth (MM-DD-YYYY)</label>
          <input className='inputfield'
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        {/* Add more form fields here */}
        <div className="half">
          <label htmlFor="Doctor">Doctor's name</label>
          <textarea  className='inputfield'
            name="Doctor"
            id="Doctor"
            placeholder="Doctor's name"
            value={formData.Doctor}
            onChange={handleChange}
          />
        </div>
        <div className="half">
          <label htmlFor="diagnosis">Diagnosis</label>
          <input  className='inputfield'
            type="text"
            name="diagnosis"
            id="diagnosis"
            placeholder="Enter Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          />
        </div>
        <div className="half">
          <label htmlFor="Treatments">Treatments</label>
          <input  className='inputfield'
            type="text"
            name="Treatments"
            id="Treatments"
            placeholder="Enter Treatments"
            value={formData.Treatments}
            onChange={handleChange}
          />
        </div>
        {/* Add more form fields as needed */}
        <div className="half">
          <label htmlFor="Vitals">Vital Sign</label>
          <input  className='inputfield'
            type="text" // Use tel input type for phone numbers
            name="Vitals"
            id="Vitals"
            placeholder="Enter  Vitals details"
            value={formData.Vitals}
            onChange={handleChange}
          />
        </div>
        <div className="half">
          <label htmlFor="LabTest">Laboratory Tests</label>
          <input  className='inputfield'
            type="text"
            name="LabTest"
            id="LabTest"
            placeholder="Enter Laboratory Tests"
            value={formData.LabTest}
            onChange={handleChange}
          />
        </div>
        <div className="half">
          <label htmlFor="LabTest">Patient Id</label>
          <input  className='inputfield'
            type="text"
            name="loginId"
            id="loginId"
            placeholder="Enter Patient Id"
            value={formData.loginId}
            onChange={handleChange}
          />
        </div>
        <div className={"submit1"} onClick={handleSubmit}>Submit</div>
      </div>
    </div>
  );
};

export default MedicalReport;
