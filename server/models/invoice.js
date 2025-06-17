export default (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unpaid'
    }
  });

  Invoice.associate = models => {
    Invoice.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE'
    });
    Invoice.belongsTo(models.Appointment, {
      foreignKey: 'appointmentId',
      onDelete: 'CASCADE'
    });
  };

  return Invoice;
};
