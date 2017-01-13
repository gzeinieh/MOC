'use strict';

angular.module('missioncontrolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('commands', {
        url: '/commands',
        templateUrl: 'app/commands/commands.html',
        controller: 'CommandsCtrl'
      });
  });
