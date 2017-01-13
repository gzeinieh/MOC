'use strict';

angular.module('missioncontrolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('healthmonitoring', {
        url: '/healthmonitoring',
        templateUrl: 'app/healthmonitoring/health.html',
        controller: 'HealthCtrl',
        controllerAs: 'health'
      });
  });
