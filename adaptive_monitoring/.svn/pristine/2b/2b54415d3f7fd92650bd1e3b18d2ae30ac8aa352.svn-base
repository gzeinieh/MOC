'use strict';

angular.module('missioncontrolApp').controller('CommandlogCtrl', function ($scope, $http) {
  var _this = this;

  $http.get('/api/commands/log').then(function (response) {
    console.log(response);
    _this.commands = response.data;
  });
});
//# sourceMappingURL=commandlog.controller.js.map
