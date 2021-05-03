'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    
    static associate(models) {
      this.belongsTo(models.AccountTypes, {
        foreignKey: 'type_id'
      });

      this.belongsTo(models.Clients, {
        foreignKey: 'client_id'
      });

      this.hasMany(models.Transactions, {
        foreignKey: 'account_ori'
      });

      this.hasMany(models.Transactions, {
        foreignKey: 'account_des'
      });
    }
  };
  Accounts.init({
    account_no: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL,
    type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Accounts',
    tableName: 'accounts',
    underscored: true
  });
  return Accounts;
};