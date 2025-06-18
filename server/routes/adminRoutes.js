import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

// === Controllers ===
import { renderDashboard } from '../controllers/adminController.js'; 
import {
  renderLogin,
  loginUser,
  logoutUser,
  registerAdmin
} from '../controllers/authController.js';

import {
  getAllPatients,
  renderAddPatient,
  addPatient,
  renderEditPatient,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

import {
  getAllAppointments,
  renderAddAppointment,
  addAppointment,
  renderEditAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

import {
  getAllProcedures,
  renderAddProcedure,
  addProcedure,
  renderEditProcedure,
  updateProcedure,
  deleteProcedure
} from '../controllers/procedureController.js';

import {
  renderUploadForm,
  handleUpload,
  listXrays
} from '../controllers/xrayController.js';

import {
  renderCreateInvoice,
  handleCreateInvoice,
  listInvoices,
  markPaid
} from '../controllers/billingController.js';

const router = express.Router();

// === ADMIN DASHBOARD ===
router.get('/dashboard', ensureAuth, renderDashboard); // ✅ Correct function here

// === PATIENT ROUTES ===
router.get('/patients', ensureAuth, getAllPatients);
router.get('/patients/add', ensureAuth, renderAddPatient);
router.post('/patients/add', ensureAuth, addPatient);
router.get('/patients/edit/:id', ensureAuth, renderEditPatient);
router.post('/patients/edit/:id', ensureAuth, updatePatient);
router.get('/patients/delete/:id', ensureAuth, deletePatient);

// === APPOINTMENT ROUTES ===
router.get('/appointments', ensureAuth, getAllAppointments);
router.get('/appointments/add', ensureAuth, renderAddAppointment);
router.post('/appointments/add', ensureAuth, addAppointment);
router.get('/appointments/edit/:id', ensureAuth, renderEditAppointment);
router.post('/appointments/edit/:id', ensureAuth, updateAppointment);
router.get('/appointments/delete/:id', ensureAuth, deleteAppointment);
router.post('/appointments/:id/status', ensureAuth, updateAppointmentStatus);


// === PROCEDURE ROUTES ===
router.get('/procedures', ensureAuth, getAllProcedures);
router.get('/procedures/add', ensureAuth, renderAddProcedure);
router.post('/procedures/add', ensureAuth, addProcedure);
router.get('/procedures/edit/:id', ensureAuth, renderEditProcedure);
router.post('/procedures/edit/:id', ensureAuth, updateProcedure);
router.get('/procedures/delete/:id', ensureAuth, deleteProcedure);

// === XRAY ROUTES ===
router.get('/xrays/upload', ensureAuth, renderUploadForm);
router.post('/xrays/upload', ensureAuth, upload.single('xray'), handleUpload);
router.get('/xrays', ensureAuth, listXrays);

// === INVOICE ROUTES ===
router.get('/invoices/add', ensureAuth, renderCreateInvoice);
router.post('/invoices/add', ensureAuth, handleCreateInvoice);
router.get('/invoices', ensureAuth, listInvoices);
router.post('/invoices/:id/pay', ensureAuth, markPaid);

// === AUTH ROUTES ===
router.get('/', renderLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/register-admin', registerAdmin);

export default router;
