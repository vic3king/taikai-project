module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    'Skill',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      jobId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );
  Skill.associate = models => {
    const { Job } = models;

    // associations can be defined here
    Skill.belongsTo(Job, {
      foreignKey: 'jobId',
    });
  };
  return Skill;
};
