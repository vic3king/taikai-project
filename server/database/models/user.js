module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'This email already exists!',
        },
      },
      isSubscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );

  // // eslint-disable-next-line func-names
  // User.prototype.toJSON = function() {
  //   const values = Object.assign({}, this.get());

  //   delete values.password;
  //   return values;
  // };
  // User.associate = models => {
  //   const { Location, UserRequest, ArtisanServiceOption, WorkHistory } = models;

  //   User.hasMany(WorkHistory, {
  //     as: 'workHistory',
  //     foreignKey: 'userId',
  //   });

  //   User.hasMany(Location, {
  //     as: 'locations',
  //     foreignKey: 'userId',
  //   });

  //   User.hasMany(UserRequest, {
  //     as: 'requests',
  //     foreignKey: 'userId',
  //   });

  //   User.hasMany(UserRequest, {
  //     as: 'artisanRequests',
  //     foreignKey: 'artisanId',
  //   });

  //   User.hasMany(ArtisanServiceOption, {
  //     as: 'serviceOptions',
  //     foreignKey: 'artisanId',
  //   });
  // };
  return User;
};
