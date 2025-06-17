// temp-hash.js
import bcrypt from 'bcryptjs';
import { User } from './models/index.js'; // Adjust if your model import is different
import sequelize from './config/database.js'; // Your Sequelize instance (if separated)

const createUser = async () => {
  try {
    await sequelize.authenticate(); // Ensure DB connection is active

    const hashedPassword = await bcrypt.hash('admin', 10);

    await User.create({
      name: 'Admin User',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created!');
    process.exit();
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  }
};

createUser();
