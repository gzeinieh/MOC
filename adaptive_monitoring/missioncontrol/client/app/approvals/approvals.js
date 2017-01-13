'use strict';

angular.module('missioncontrolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('approvals', {
        url: '/approvals',
        templateUrl: 'app/approvals/approvals.html',
        controller: 'ApprovalsCtrl',
        controllerAs: 'approval'
      });
  });
