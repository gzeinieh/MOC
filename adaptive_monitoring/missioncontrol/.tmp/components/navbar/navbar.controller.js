'use strict';

angular.module('missioncontrolApp').controller('NavbarCtrl', function ($scope, Auth) {
  $scope.menu = [{
    title: 'Segment Allocator',
    state: 'allocator'
  }, {
    title: 'Command Entry',
    state: 'tracker'
  }, {
    title: 'Approve Commands',
    state: 'approvals'
  }, {
    title: 'Queue',
    state: 'queue'
  }, {
    title: 'Command Log',
    state: 'commandlog'
  }, {
    title: 'SatManager',
    state: 'satmanager'
  }, {
    title: 'HealthMonitoring',
    state: 'healthmonitoring'
  }];

  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;
});
//# sourceMappingURL=navbar.controller.js.map
