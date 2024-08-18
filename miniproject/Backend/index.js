const express = require('express');
const bodyParser = require('body-parser');
const { makeGeminiRequest } = require('./gem');
const mongoose = require('mongoose');
const Login = require('./models/Login.model.js');
const MDF = require('./models/MDF.model.js')
const auth = require('./middleware/auth');
const Patient = require('./models/Patient.model.js');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const getNextLoginKey = async () => {
    const lastUser = await Login.findOne().sort({ loginKey: -1 });
    const lastKey = lastUser ? parseInt(lastUser.loginKey.substr(1)) : 0;
    const nextKey = lastKey + 1;
    const paddedKey = String(nextKey).padStart(5, '0'); // Pad the key with zeros to ensure it's 5 digits long
    return `P${paddedKey}`;
};
app.post('/generate-summary', async (req, res) => {
    const { patientData } = req.body;

    if (!patientData) {
        return res.status(400).send({ error: 'Patient data is required' });
    }

    const prompt = `Generate a new medical summary paragraph by also taking the info from each key in the row of the same patient having the dictionary ${JSON.stringify(patientData)}. Make it a really good paragraph`;

    try {
        console.log('Generating summary for patient:', patientData);
        
        const summary = await makeGeminiRequest(prompt);
        console.log('Summary generated:', summary);

        if (summary) {
            res.status(200).send({ summary });
        } else {
            res.status(500).send({ error: 'Failed to generate summary' });
        }
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await Login.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check if password matches
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Incorrect password.' });
        }

        // Password is correct, return success response
        const token = user.generateAuthToken();
        //localStorage.setItem('loginKey', user.loginKey);
        res.status(200).json({ success: true, message: 'Login successful.',token, loginKey: user.loginKey  });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred during login.' });
    }
});


app.post('/signup', async (req, res) => {
    try {
        const existingUser = await Login.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please use a different email.' });
        }

        // Generate the next login key
        const loginKey = await getNextLoginKey();

        // If the email doesn't exist, create a new user with the generated login key
        const newUser = await Login.create({ ...req.body, loginKey });

        res.status(200).json({ success: true, message: 'User registered successfully.', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred during signup.' });
    }
});
app.post('/MDF', auth,async (req, res) => {
    try{
    const newUser = await MDF.create({ ...req.body});

    res.status(200).json({ success: true, message: 'User registered successfully.', user: newUser });}
 catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred during signup.' });
}
});
app.post('/Labtech', auth, async (req, res) => {
    try {
        const { loginId, LabTest } = req.body;

        // Find the MDF document for the provided loginId
        const existingMDF = await MDF.findOne({ loginId });

        if (!existingMDF) {
            return res.status(404).json({ success: false, message: 'MDF not found for the provided loginId.' });
        }

        // Update the LabTest field of the existing MDF document
        existingMDF.LabTest = LabTest;
        await existingMDF.save();

        res.status(200).json({ success: true, message: 'MDF updated successfully.', mdf: existingMDF });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred during MDF update.' });
    }
});
app.get('/patient', async (req, res) => {
    const { loginKey } = req.query;
  
    if (!loginKey) {
      return res.status(400).json({ error: 'loginId query parameter is required' });
    }
  
    try {
      const patient = await Patient.findOne({ loginId: loginKey });
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/patients', async (req, res) => {
    const { loginKey } = req.query;
    console.log(loginKey)
  
    if (!loginKey) {
      return res.status(400).json({ error: 'loginKey query parameter is required' });
    }
  
    try {
        const patients = await MDF.find({ loginId: loginKey });
        console.log("Patients found:", patients);
        if (!patients) {
          return res.status(404).json({ error: 'No patients found for the provided loginKey' });
        }
        res.status(200).json(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: 'An error occurred while fetching patients' });
      }
  });
  app.post('/patient', async (req, res) => {
    const patientData =req.body;
    const  key  = req.body.loginId;
    console.log(key)
    console.log('Received data:', req.body);
  
    try {
      // Find the user with the provided loginKey and update the user's data
      // If the user doesn't exist, create a new user record
      const updatedUser = await Patient.findOneAndUpdate(
        { loginId: key },
        { ...patientData, loginKey: key },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
mongoose.connect("mongodb+srv://admin:Gwhl1pblsbmyNudo@cluster0.ltscpjw.mongodb.net/Login?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to database!")
    app.listen(8800,()=>{
        console.log("server on ")
    }); 
})
.catch(()=>{
    console.log("connection failed")
}); 