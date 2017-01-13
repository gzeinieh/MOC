'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Pass', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  });
};
