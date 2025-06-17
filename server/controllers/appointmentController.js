import { Appointment, Patient } from '../models/index.js';

export const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.findAll({
    include: Patient,
    order: [['date', 'DESC']]
  });
  res.render('admin/appointments', { appointments });
};

export const renderAddAppointment = async (req, res) => {
  const patients = await Patient.findAll();
  res.render('admin/addAppointment', { patients });
};

export const addAppointment = async (req, res) => {
  const { patientId, date, notes } = req.body;
  await Appointment.create({ patientId, date, notes });
  res.redirect('/admin/appointments');
};

export const renderEditAppointment = async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id);
  const patients = await Patient.findAll();
  res.render('admin/editAppointment', { appointment, patients });
};

export const updateAppointment = async (req, res) => {
  const { patientId, date, status, notes } = req.body;
  await Appointment.update(
    { patientId, date, status, notes },
    { where: { id: req.params.id } }
  );
  res.redirect('/admin/appointments');
};

export const deleteAppointment = async (req, res) => {
  await Appointment.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/appointments');
};

//  Only ONE definition of updateAppointmentStatus
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Appointment.update({ status }, { where: { id } });
    res.status(200).json({ message: 'Appointment status updated successfully' });
  } catch (err) {
    console.error('Error updating appointment status:', err);
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
};
