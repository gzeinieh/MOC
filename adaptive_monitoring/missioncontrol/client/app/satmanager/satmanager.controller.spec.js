'use strict';

angular.module('missioncontrolApp')
  .controller('SatManagerCtrl', function ($scope, $http) {
    $http.get('/api/commands/unapproved')
    .then((response) => {
      console.log(response);
      this.commands = response.data;
    });

    this.approveCommand = function approveCommand(command) {
      $http.post(`/api/commands/${command._id}/approve`)
      .then(response => {
        console.log(response);
        this.commands = _(this.commands)
          .filter(co => co._id !== command._id)
          .value();
      });
    };
  });
