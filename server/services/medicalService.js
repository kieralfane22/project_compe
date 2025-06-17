// server/services/medicalService.js
import axios from 'axios';

export const getMedicalRecords = async (patientId) => {
  const res = await axios.get(`http://localhost:5000/api/records/${patientId}`);
  return res.data;
};
