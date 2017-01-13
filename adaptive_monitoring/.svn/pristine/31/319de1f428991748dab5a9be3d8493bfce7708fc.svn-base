'use strict';

angular.module('missioncontrolApp').controller('QueueCtrl', function ($scope, $http) {
  var _this = this;

  $http.get('/api/commands/queue').then(function (response) {
    console.log(response);
    _this.commands = response.data;
  });

  this.unscheduleCommand = function unscheduleCommand(command) {
    var _this2 = this;

    $http.post('/api/commands/' + command._id + '/unschedule').then(function () {
      _this2.commands = _(_this2.commands).filter(function (co) {
        return co._id !== command._id;
      }).value();
    });
  };
});
//# sourceMappingURL=queue.controller.js.map
