'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Satellite_radio', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(75),
    model:DataTypes.STRING(75),
    manufacturer: DataTypes.STRING(75),
    type: DataTypes.STRING(30),
    frequency: DataTypes.STRING(10),
	dataRate: DataTypes.STRING(20)
  });
};
