'use strict';

import {User} from '../../sqldb';


module.exports = function(sequelize, DataTypes) {
  let Command = sequelize.define('Command', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    body: DataTypes.STRING(255),
    dateCreated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return Command;
};
