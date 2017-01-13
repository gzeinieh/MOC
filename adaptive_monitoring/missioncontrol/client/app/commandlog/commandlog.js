'use strict';

angular.module('missioncontrolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('commandlog', {
        url: '/commandlog',
        templateUrl: 'app/commandlog/commandlog.html',
        controller: 'CommandlogCtrl',
        controllerAs: 'commandlog'
      });
  });
