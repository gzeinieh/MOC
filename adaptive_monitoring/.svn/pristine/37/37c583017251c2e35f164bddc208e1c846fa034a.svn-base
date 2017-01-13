'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Mission', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(75),
    additionalInfo: DataTypes.STRING(75),
    leadInstitution: DataTypes.STRING(75),
    primaryInvestigator: DataTypes.STRING(50),
    startDate: DataTypes.DATE,
    endDate:  DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  });
};
