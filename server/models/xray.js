'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Xray extends Model {
    static associate(models) {
      Xray.belongsTo(models.Patient, { foreignKey: 'patientId' });
    }
  }

  Xray.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    xrayUrl: { // ✅ Added this field
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: DataTypes.STRING,
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Xray',
  });

  return Xray;
};
