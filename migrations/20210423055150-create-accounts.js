'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_no: {
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      balance: {
        type: Sequelize.DECIMAL
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'account_types',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};