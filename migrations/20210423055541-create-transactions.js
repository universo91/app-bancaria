'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_ori: {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      account_des: {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      transaction_type: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transactions_types',
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
    await queryInterface.dropTable('transactions');
  }
};