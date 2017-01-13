'use strict';

angular.module('missioncontrolApp')
  .controller('CommandlogCtrl', function ($scope, $http) {
    $http.get('/api/commands/log')
    .then((response) => {
      console.log(response);
      this.commands = response.data;
    });

  });
