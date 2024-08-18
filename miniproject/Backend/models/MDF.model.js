const mongoose = require('mongoose');
const Login = require('./Login.model'); // Ensure the path is correct

const MRecordSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: false },
    gender: { type: String, required: true },
    Treatments: { type: String, required: false },
    Doctor: { type: String, required: true },
    diagnosis: { type: String, required: false },
    Vitals: { type: String, required: true },
    LabTest: { type: String, required: false },
    loginId: { type: String, required: true }
    // Add more fields as needed
});

const MDF = mongoose.model('Patient', MRecordSchema);

module.exports = MDF;
