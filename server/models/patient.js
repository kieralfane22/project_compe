// server/models/patient.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.hasMany(models.Appointment, {
        foreignKey: 'patientId',
        onDelete: 'CASCADE',
      });
    }
  }

  Patient.init(
    {
      name: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      address: DataTypes.STRING,
      contact: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Patient',
    }
  );

  return Patient;
};
