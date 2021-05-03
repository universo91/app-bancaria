'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TransactionsTypes, {
        foreignKey: 'transaction_type'
      });

      this.belongsTo(models.Accounts, {
        foreignKey: 'account_ori'
      });

      this.belongsTo(models.Accounts, {
        foreignKey: 'account_des'
      });
    }
  };
  Transactions.init({
    account_ori: DataTypes.INTEGER,
    account_des: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    transaction_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
    tableMode: 'transactions',
    underscored: true
  });
  return Transactions;
};