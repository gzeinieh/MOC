'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Satellite', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    dateCreated: DataTypes.DATE,
    //units: DataTypes.STRING(4)
    size:DataTypes.STRING(4)
  });
};
