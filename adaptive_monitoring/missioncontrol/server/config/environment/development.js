'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/missioncontrol-dev'
  },
  sequelize: {
    uri: 'mysql://root:uiuc2390@localhost:3306/missioncontrol-dev',
    options: {
      logging: false,
      storage: 'dev.mysql',
      define: {
        timestamps: false
      }
    }
  },
  seedDB: true
};