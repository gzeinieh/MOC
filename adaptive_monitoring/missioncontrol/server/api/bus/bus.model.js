'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bus', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(75),
	cpu: DataTypes.STRING(50),
	ram: DataTypes.STRING(30),
	storageCapacity: DataTypes.STRING(20),
	linuxKernelVersion: DataTypes.STRING(75)
  });
};
