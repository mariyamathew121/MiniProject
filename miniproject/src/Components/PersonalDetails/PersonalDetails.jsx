import React, { useState } from 'react';
import axios from 'axios';
import './PersonalDetails.css'; // Import your CSS file
import Dashboard from '../../patient/Dashboard';
const PersonalDetails = ({ onSubmitSuccess }) => {
    const storedPatientNumber = localStorage.getItem('loginKey');
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    gender: '',
    dateOfBirth: '',
    Address: '',
    Pincode: '',
    State: '',
    City: '',
    MobileNumber: '',
    loginId: storedPatientNumber
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validation for mobile number format
    const mobileNumberRegex = /^\d+$/; // Regular expression to match only digits
    if (!mobileNumberRegex.test(formData.MobileNumber)) {
      alert('Mobile number must contain only digits.');
      return;
    }
  
    // Validation for mobile number length
    const minMobileDigits = 10;
    if (formData.MobileNumber.length < minMobileDigits) {
      alert(`Mobile number must have at least ${minMobileDigits} digits.`);
      return;
    }
  
    try {
      setFormData({ ...formData });
      console.log(formData);
      const response = await axios.post('http://localhost:8800/patient', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted successfully:', response.data);
      onSubmitSuccess();
      // Optionally, you can reset the form here
      setFormData({
        FirstName: '',
        LastName: '',
        gender: '',
        dateOfBirth: '',
        Address: '',
        Pincode: '',
        State: '',
        City: '',
        MobileNumber: '',
        loginId: ''
      });
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };
  
  

  return (
    <div className="container">
      <h2>Patient Details Form</h2>
      <form onSubmit={handleSubmit} method="POST"> 
        <label htmlFor="FirstName">First Name:</label>
        <input
          type="text"
          name="FirstName"
          id="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="LastName">Last Name:</label>
        <input
          type="text"
          name="LastName"
          id="LastName"
          value={formData.LastName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="select-field"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          name="Address"
          id="Address"
          value={formData.Address}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="Pincode">Pincode:</label>
        <input
          type="text"
          name="Pincode"
          id="Pincode"
          value={formData.Pincode}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="State">State:</label>
        <input
          type="text"
          name="State"
          id="State"
          value={formData.State}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="City">City:</label>
        <input
          type="text"
          name="City"
          id="City"
          value={formData.City}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="MobileNumber">Mobile Number:</label>
        <input
          type="tel"
          name="MobileNumber"
          id="MobileNumber"
          value={formData.MobileNumber}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PersonalDetails;
