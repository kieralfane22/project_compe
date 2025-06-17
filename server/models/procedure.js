export default (sequelize, DataTypes) => {
  const Procedure = sequelize.define('Procedure', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    description: DataTypes.TEXT
  });

  Procedure.associate = models => {
    Procedure.belongsTo(models.Appointment, {
      foreignKey: 'appointmentId',
      onDelete: 'CASCADE'
    });
  };

  return Procedure;
};
