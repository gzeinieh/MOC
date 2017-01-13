'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Threshold', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    updatedAt: DataTypes.DATE,
	min_threshold: DataTypes.FLOAT,
	max_threshold: DataTypes.FLOAT
  });
};
