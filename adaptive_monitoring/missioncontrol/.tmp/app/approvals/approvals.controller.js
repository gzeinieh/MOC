'use strict';

angular.module('missioncontrolApp').controller('ApprovalsCtrl', function ($scope, $http) {
  var _this = this;

  $http.get('/api/commands/unapproved').then(function (response) {
    console.log(response);
    _this.commands = response.data;
  });

  this.approveCommand = function approveCommand(command) {
    var _this2 = this;

    $http.post('/api/commands/' + command._id + '/approve').then(function (response) {
      console.log(response);
      _this2.commands = _(_this2.commands).filter(function (co) {
        return co._id !== command._id;
      }).value();
    });
  };
});
//# sourceMappingURL=approvals.controller.js.map
