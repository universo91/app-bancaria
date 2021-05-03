'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountTypes extends Model {
    
    static associate(models) {
        this.hasMany(models.Accounts,{
          foreignKey: 'type_id'
        });
    }
  };
  AccountTypes.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccountTypes',
    // NOmbre de la tabla a la cual estara asociado este modelo
    tableName: 'account_types',
    // Con esto le decimos a sequelize que cambie la nomenclatura de 
    // camelCase a snake_case
    underscored: true
  });
  return AccountTypes;
};