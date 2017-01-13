'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mag3110', {
	_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	createdAt: DataTypes.DATE,
	sensorReading: DataTypes.FLOAT 
  },
  {
	// Removes sequelize auto-pluralization of table names, and sets name.	
	freezeTableName: true,
	tableName: 'sensor_mag3110_data' 
  });
};
