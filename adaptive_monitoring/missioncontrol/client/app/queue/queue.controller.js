'use strict';

angular.module('missioncontrolApp')
  .controller('QueueCtrl', function ($scope, $http) {
    $http.get('/api/commands/queue')
    .then((response) => {
      console.log(response);
      this.commands = response.data;
    });

    this.unscheduleCommand = function unscheduleCommand(command) {
      $http.post(`/api/commands/${command._id}/unschedule`)
      .then(() => {
        this.commands = _(this.commands)
          .filter(co => co._id !== command._id)
          .value();
      });
    };
  });
