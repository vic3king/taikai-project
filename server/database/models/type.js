module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    'Type',
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
      jobType: {
        type: DataTypes.ENUM(
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
    },
    {}
  );

  Type.associate = models => {
    const { Job } = models;

    // associations can be defined here
    Type.belongsTo(Job, {
      foreignKey: 'jobId',
    });
  };
  return Type;
};
