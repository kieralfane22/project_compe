import { Appointment } from '../models/index.js'; // Adjust the path if needed

export const renderAdminDashboard = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [['date', 'DESC']],
      limit: 5
    });

    res.render('admin/dashboard', {
      user: req.user,
      appointments
    });
  } catch (err) {
    console.error('🚨 Dashboard Load Error:', err); // log full error to terminal
    res.status(500).send(`
      <h1>❌ Dashboard Failed to Load</h1>
      <pre>${err.stack}</pre> <!-- shows detailed error in browser -->
    `);
  }
};
