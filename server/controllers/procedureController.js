import { Procedure, Appointment, Patient } from '../models/index.js';

export const getAllProcedures = async (req, res) => {
  const procedures = await Procedure.findAll({
    include: {
      model: Appointment,
      include: [Patient]
    }
  });
  res.render('admin/procedures', { procedures });
};

export const renderAddProcedure = async (req, res) => {
  const appointments = await Appointment.findAll({ include: [Patient] });
  res.render('admin/addProcedure', { appointments });
};

export const addProcedure = async (req, res) => {
  const { appointmentId, name, cost, description } = req.body;
  await Procedure.create({ appointmentId, name, cost, description });
  res.redirect('/admin/procedures');
};

export const renderEditProcedure = async (req, res) => {
  const procedure = await Procedure.findByPk(req.params.id);
  const appointments = await Appointment.findAll({ include: [Patient] });
  res.render('admin/editProcedure', { procedure, appointments });
};

export const updateProcedure = async (req, res) => {
  const { appointmentId, name, cost, description } = req.body;
  await Procedure.update(
    { appointmentId, name, cost, description },
    { where: { id: req.params.id } }
  );
  res.redirect('/admin/procedures');
};

export const deleteProcedure = async (req, res) => {
  await Procedure.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/procedures');
};
