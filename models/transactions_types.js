'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionsTypes extends Model {
    
    static associate(models) {
     this.hasMany(models.Transactions, {
       foreignKey: 'transaction_type'
     });
    }
  };
  TransactionsTypes.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionsTypes',
    tableName: 'transactions_types',
    underscored: true
  });
  return TransactionsTypes;
};