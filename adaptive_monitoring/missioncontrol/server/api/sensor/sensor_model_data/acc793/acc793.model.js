'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('acc793', {
	_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	createdAt: DataTypes.DATE,
	x_value:  DataTypes.FLOAT,
	y_value:  DataTypes.FLOAT,
	z_value:  DataTypes.FLOAT, 

  },
  {
	// Removes sequelize auto-pluralization of table names, and sets name.	
	freezeTableName: true,
	tableName: 'sensor_acc793_data' 
  });
};
