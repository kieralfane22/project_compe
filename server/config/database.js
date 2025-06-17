import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'dental_clinic',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
