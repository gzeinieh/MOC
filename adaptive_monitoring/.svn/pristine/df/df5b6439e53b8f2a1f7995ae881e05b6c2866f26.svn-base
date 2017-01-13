'use strict';

angular.module('missioncontrolApp')
  .controller('NewCommandCtrl', function ($scope, $http) {
    $scope.command = {};



    $http.get('/api/satellites')
    .then((response) => {
      console.log(response);
      this.availableSatellites = response.data;
      let firstSat = this.availableSatellites[0];
      $http.get(`/api/satellites/${firstSat._id}/passes`)
      .then((response) => {
        console.log(response.data);
      })
    });

    this.units = [
      'Attitude',
      'Magnetometer',
      'Photosensor'
    ];

    this.unitCommands = {
      'Attitude': [
        'move 3º',
        'move -3º'
      ],
      'Magnetometer': [
        'send readings'
      ],
      'Photosensor': [
        'calibrate'
      ]
    };

    $http.get('/api/commands/mine')
    .then((response) => {
      console.log(response);
      this.myCommands = response.data;
    });



    $scope.submitCommand = function submitCommand(command) {
      command.body = `${command.unit}:${command.body}`;
      $http.post('/api/commands', command)
      .then(function (response) {
        console.log(response);
      },
      function (err) {
        console.error(err);
      });
    };

  });
