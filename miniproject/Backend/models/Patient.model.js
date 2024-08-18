const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    Address: { type: String, required: true },
    Pincode: { type: String, required: true },
    State: { type: String, required: true },
    City: { type: String, required: true },
    MobileNumber: { type: Number, required: true },
    loginId: { type: String, required: true }
    // Add more fields as needed
});

const Patient = mongoose.model('PatientDetail', patientSchema);

module.exports = Patient;
