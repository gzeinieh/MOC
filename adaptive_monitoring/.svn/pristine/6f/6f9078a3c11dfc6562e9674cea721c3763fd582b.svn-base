'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sensor_type', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	name: DataTypes.STRING(75),
	manufacturer: DataTypes.STRING(75),
    model: {type: DataTypes.STRING(75), unique: true},
	type: DataTypes.STRING(75)
  });
};
