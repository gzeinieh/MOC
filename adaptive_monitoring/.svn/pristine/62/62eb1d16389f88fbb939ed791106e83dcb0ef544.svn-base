'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payload', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
	primaryInvestigator: DataTypes.STRING,
	piEmailAddress: DataTypes.STRING,
	piPhone: DataTypes.STRING(15),
	scientificObjective: DataTypes.STRING
  });
};
