module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Types', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      jobId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      jobType: {
        type: Sequelize.ENUM(
          'full time',
          'part time',
          'contract',
          'fellowship',
          'pro bono',
          'voluntary',
          'internship',
          'remote'
        ),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => queryInterface.dropTable('Types'),
};
