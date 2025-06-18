import { Appointment, Patient } from '../models/index.js';

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: Patient,
      order: [['date', 'DESC']]
    });
    res.render('admin/appointments', { appointments });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).send('Server error.');
  }
};

export const renderAddAppointment = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.render('admin/addAppointment', { patients });
  } catch (err) {
    console.error('Error rendering add appointment:', err);
    res.status(500).send('Server error.');
  }
};

export const addAppointment = async (req, res) => {
  try {
    const { patientId, date, notes } = req.body;
    await Appointment.create({ patientId, date, notes });
    res.redirect('/admin/appointments');
  } catch (err) {
    console.error('Error adding appointment:', err);
    res.status(500).send('Failed to add appointment.');
  }
};

export const renderEditAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    const patients = await Patient.findAll();
    res.render('admin/editAppointment', { appointment, patients });
  } catch (err) {
    console.error('Error rendering edit appointment:', err);
    res.status(500).send('Server error.');
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { patientId, date, status, notes } = req.body;
    await Appointment.update(
      { patientId, date, status, notes },
      { where: { id: req.params.id } }
    );
    res.redirect('/admin/appointments');
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).send('Failed to update appointment.');
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/appointments');
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).send('Failed to delete appointment.');
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Normalize status to match database values if needed
    const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    await Appointment.update({ status: normalizedStatus }, { where: { id } });

    res.redirect('/admin/appointments');
  } catch (err) {
    console.error('❌ Error updating appointment status:', err);
    res.status(500).send('Failed to update appointment status.');
  }
};
