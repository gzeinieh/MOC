'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Groundstation', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(75),
    location: DataTypes.STRING(100),
    primaryContact: DataTypes.STRING(50),
    priContactEmail: DataTypes.STRING(80),
    priContactPhone: DataTypes.STRING(15),
    secondaryContact: DataTypes.STRING(50),
    secContactEmail: DataTypes.STRING(80),
    secContactPhone: DataTypes.STRING(15),
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  });
};
