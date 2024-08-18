import React, { useState } from 'react';
import './LabReport.css'; // Import your CSS file
import axios from 'axios';

const Labtech = () => {
  const [labFormData, setLabFormData] = useState({
    LabTest: '',
    loginId: ''
  });
  const token = localStorage.getItem('authToken');
  const loginKey = localStorage.getItem('loginId');

  const handleChange = (event) => {
    setLabFormData({ ...labFormData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8800/Labtech', labFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('Lab Test added successfully:', response.data);
    } catch (error) {
      console.error('An error occurred while adding Lab Test:', error);
    }
  };

  return (
    <div className="container2">
      <h2 className="h2">Labtech Form</h2>
      <div className="form">
        <div className="half">
          <label htmlFor="LabTest">Laboratory Test</label>
          <input className='inputfield'
            type="text"
            name="LabTest"
            id="LabTest"
            placeholder="Enter Laboratory Test"
            value={labFormData.LabTest}
            onChange={handleChange}
          />
        </div>
        <div className="half">
          <label htmlFor="loginId">Patient Id</label>
          <input className='inputfield'
            type="text"
            name="loginId"
            id="loginId"
            placeholder="Enter Patient Id"
            value={labFormData.loginId}
            onChange={handleChange}
          />
        </div>
        <div className="submit1" onClick={handleSubmit}>Submit</div>
      </div>
    </div>
  );
};

export default Labtech;
