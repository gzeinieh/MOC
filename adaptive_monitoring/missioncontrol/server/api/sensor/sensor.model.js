'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sensor', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	min_threshold: DataTypes.FLOAT,
	max_threshold: DataTypes.FLOAT,
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
  });
};
