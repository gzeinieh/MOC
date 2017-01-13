'use strict';

angular.module('missioncontrolApp').config(function ($stateProvider) {
  $stateProvider.state('allocator', {
    url: '/allocator',
    templateUrl: 'app/allocator/allocator.html',
    controller: 'AllocatorCtrl',
    controllerAs: 'allocator'
  });
});
//# sourceMappingURL=allocator.js.map
