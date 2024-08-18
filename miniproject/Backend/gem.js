const axios = require('axios');
const { api_key } = require('./config');

const base_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`;

async function makeGeminiRequest(prompt, method = 'POST') {
    const headers = { "Content-Type": "application/json" };
    const data = {
        contents: [{ parts: [{ text: prompt }] }]
    };
    const url = base_url;

    try {
        const response = await axios.request({
            method: method,
            url: url,
            data: data,
            headers: headers
        });

        const candidates = response.data.candidates || [];
        for (const candidate of candidates) {
            const content = candidate.content || {};
            const parts = content.parts || [];

            for (const part of parts) {
                const text = part.text || '';
                if (text) {
                    return text;
                }
            }
        }
    } catch (error) {
        console.error(`Error making Gemini API request: ${error}`);
        return null;
    }
}
module.exports = { makeGeminiRequest };
//  const bio = " ";
//  const l = {loginId: 'P00001',
//     fullName: 'William Walker',
//     gender: 'Male',
//     MedicalConditions: 'Gastroesophageal reflux disease (GERD)',
//     Treatments: 'Lifestyle modifications, Medication for heartburn (possible)',
//     diagnosis: 'GERD',
//     Doctor: 'Dr. Martinez',
//     Vitals: 'BP: 130/85mmHg, Pulse: 78bpm, RR: 14',
//     LabTest: 'C-reactive protein (CRP)',
//     Hospital: 'Carmel Hospital'
    
//  };
//  const prompt = `Generate a new medical summary paragraph of ${bio} by also taking the info from each key in the row of the same patient having the dictionary ${JSON.stringify(l)}.make sure that you do not add any information on your own and only work with information you are given`;

// makeGeminiRequest(prompt).then(response => {
//      console.log(response);
//  });