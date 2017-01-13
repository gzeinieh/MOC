'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Response', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    body: DataTypes.STRING,
    dateReceived: DataTypes.DATE
  });
};
