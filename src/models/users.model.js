// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    avatar: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: {
        args: true,
        msg: 'That phone number is already in use!'
      },
      validate:{
        is:{
          args:/^\+[1-9]\d{1,14}$/,
          msg: 'Enter a valid US phone number'
        }
      }

    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'That email address is already in use!'
      },
      validate:{
        isEmail:{
          args:true,
          msg: 'Enter a valid email address'
        }
      }
    },
    googleId: { type: Sequelize.STRING },


    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
