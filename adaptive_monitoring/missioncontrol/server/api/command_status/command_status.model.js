'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Command_status', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	status: DataTypes.STRING(30),
	scheduledSendTime: DataTypes.DATE,
	approved: DataTypes.BOOLEAN
  });
};
