import express from 'express';
import {
  getAllAppointments,
  addAppointment,
  updateStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/add', addAppointment);
router.post('/:id/status', updateStatus);
router.get('/delete/:id', deleteAppointment);

export default router;
