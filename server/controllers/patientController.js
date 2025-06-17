import { Patient } from '../models/index.js';
import { getMedicalRecords } from '../services/medicalService.js'; // ✅ fixed to ESM

// List all patients
export const getAllPatients = async (req, res) => {
  const patients = await Patient.findAll();
  res.render('admin/patients', { patients });
};

// Render create form
export const renderAddPatient = (req, res) => {
  res.render('admin/addPatient');
};

// Save new patient
export const addPatient = async (req, res) => {
  const { name, birthdate, address, contact } = req.body;
  await Patient.create({ name, birthdate, address, contact });
  res.redirect('/admin/patients');
};

// Render edit form
export const renderEditPatient = async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);
  res.render('admin/editPatient', { patient });
};

// Update patient
export const updatePatient = async (req, res) => {
  const { name, birthdate, address, contact } = req.body;
  await Patient.update(
    { name, birthdate, address, contact },
    { where: { id: req.params.id } }
  );
  res.redirect('/admin/patients');
};

// Delete patient
export const deletePatient = async (req, res) => {
  await Patient.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/patients');
};

// View profile with medical records
export const viewProfile = async (req, res) => {
  const patient = await Patient.findByPk(req.user.id);
  const records = await getMedicalRecords(patient.id);
  res.render('admin/patientProfile', { patient, records });
};
