import { Appointment, Patient } from '../models/index.js';

export const renderDashboard = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: {
        model: Patient,
        attributes: ['name'],
      },
      order: [['date', 'DESC']],
      limit: 5
    });

    const formattedAppointments = appointments.map(a => ({
      id: a.id,
      date: a.date,
      status: a.status,
      patientName: a.Patient?.name || 'Unknown'
    }));

    res.render('admin/dashboard', {
      user: req.user,
      appointments: formattedAppointments
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).send('Error loading dashboard');
  }
};
