// server/models/index.js
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

import configFile from '../config/config.json' assert { type: 'json' };
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = fs
  .readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  );

for (const file of files) {
  const { default: modelFunc } = await import(`./${file}`);
  const model = modelFunc(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

export const User = db.User;
export const Appointment = db.Appointment;
export const Patient = db.Patient;
export const Procedure = db.Procedure;
export const Xray = db.Xray;
export const Invoice = db.Invoice;

export { sequelize, Sequelize };
export default db;
