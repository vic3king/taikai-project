module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recruiter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recruiterContact: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numberOfHires: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      typeId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      skillId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      locationId: {
        allowNull: true,
        type: Sequelize.UUID,
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
  down: queryInterface => queryInterface.dropTable('Jobs'),
};
