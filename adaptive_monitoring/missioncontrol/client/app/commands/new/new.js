'use strict';

angular.module('missioncontrolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new-command', {
        url: '/commands/new',
        templateUrl: 'app/commands/new/new.html',
        controller: 'NewCommandCtrl',
        controllerAs: 'newCommand'
      });
  });
