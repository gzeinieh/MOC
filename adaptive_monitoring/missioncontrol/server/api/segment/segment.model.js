'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Segment', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    startTime: {type: DataTypes.DATE, unique: true},
    endTime: {type: DataTypes.DATE, unique: true}
  });
};
