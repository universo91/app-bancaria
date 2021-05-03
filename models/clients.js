'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
   
    static associate(models) {
      this.hasMany(models.Accounts, {
        foreignKey: 'client_id'
      });
    }
  };
  Clients.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true, // con true establece la opcion de los campos a la verson snake_case
    modelName: 'Clients',
    tableName: 'clients'
  });
  return Clients;
};