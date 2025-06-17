// controllers/billingController.js
import { Invoice, Patient, Appointment } from '../models/index.js';

export const renderCreateInvoice = async (req, res) => {
  const patients = await Patient.findAll();
  const appointments = await Appointment.findAll({ where: { status: 'done' } });
  res.render('admin/createInvoice', { patients, appointments });
};

export const handleCreateInvoice = async (req, res) => {
  const { patientId, appointmentId, amount, notes } = req.body;

  await Invoice.create({
    patientId,
    appointmentId,
    amount,
    notes,
    status: 'unpaid'
  });

  res.redirect('/admin/invoices');
};

export const listInvoices = async (req, res) => {
  const invoices = await Invoice.findAll({
    include: [Patient, Appointment]
  });
  res.render('admin/invoices', { invoices });
};

export const markPaid = async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (invoice) {
    invoice.status = 'paid';
    await invoice.save();
  }
  res.redirect('/admin/invoices');
};
