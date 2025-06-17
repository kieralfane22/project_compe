// server/models/appointment.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.Patient, {
        foreignKey: 'patientId',
        onDelete: 'CASCADE',
      });
    }
  }

  Appointment.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      notes: DataTypes.TEXT,
      xrayUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Appointment',
    }
  );

  return Appointment;
};
