'use strict';

angular.module('missioncontrolApp')
  .controller('TrackerCtrl', function ($scope, $http) {

    this.command = {};


    this.submitCommand = function submitCommand(satellite, unit, command) {
      let com = {
        satellite: satellite._id,
        body: `${unit}:${command}`
      };

      $http.post('/api/commands', com)
        .then(function (response) {
          console.log(response);
        },
        function (err) {
          console.error(err);
        });
    };


    $http.get(`/api/groundstations`)
    .then((response) => {
      this.groundstations = response.data;
    });

    $http.get(`/api/commands/unscheduled`)
    .then((response) => {
      this.unscheduledCommands = response.data;
    });

    $http.get('/api/satellites')
    .then((response) => {
      this.availableSatellites = _(response.data)
        .map(satellite => {
          satellite.units = JSON.parse(satellite.units);
          satellite.availableCommands = JSON.parse(satellite.availableCommands);
          return satellite;
        })
        .value();
        console.log(this.availableSatellites);
    });

    this.scheduleCommand = function scheduleCommand(command, passNum) {
      console.log(passNum);
      $http.post(`/api/commands/${command._id}/schedule`, {SegmentId: passNum})
      .then(response => {
        console.log(response);
        this.unscheduledCommands = _(this.unscheduledCommands)
          .filter(commandf => commandf._id !== command._id)
          .value();
      });
    };


    this.getAssignedSegments = function getAssignedSegments(satellite, groundstation) {
      if (satellite, groundstation) {
        $http.get(`/api/satellites/${satellite}/assignedSegments?groundstation=${groundstation}`)
        .then((response) => {
          console.log(response.data);
          this.segments = response.data;
        });
      }
    };
});
