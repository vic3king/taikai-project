module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    'Job',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recruiter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recruiterContact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numberOfHires: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      typeId: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      skillId: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      locationId: {
        allowNull: true,
        type: DataTypes.UUID,
      },
    },
    {}
  );

  Job.associate = models => {
    const { Location, Skill, Type } = models;

    Job.hasMany(Location, {
      as: 'locations',
      foreignKey: 'jobId',
    });

    Job.hasMany(Skill, {
      as: 'skills',
      foreignKey: 'jobId',
    });

    Job.hasMany(Type, {
      as: 'contractTypes',
      foreignKey: 'jobId',
    });
  };
  return Job;
};
