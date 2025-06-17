module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Dr. John Tooth',
        email: 'admin@clinic.com',
        password: '$2b$10$u8iQxwZJxQ/ENc7EwjXWmu0N8sZTuK1aKZkzMRglIXVn0z4zM5qDu', // hashed: 'admin123'
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
