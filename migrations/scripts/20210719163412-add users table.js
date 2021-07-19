'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users', {
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
        // options
      }
    );
  },
  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
