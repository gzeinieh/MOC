'use strict';

angular.module('missioncontrolApp').controller('TrackerCtrl', function ($scope, $http) {
  var _this = this;

  this.command = {};

  this.submitCommand = function submitCommand(satellite, unit, command) {
    var com = {
      satellite: satellite._id,
      body: unit + ':' + command
    };

    $http.post('/api/commands', com).then(function (response) {
      console.log(response);
    }, function (err) {
      console.error(err);
    });
  };

  $http.get('/api/groundstations').then(function (response) {
    _this.groundstations = response.data;
  });

  $http.get('/api/commands/unscheduled').then(function (response) {
    _this.unscheduledCommands = response.data;
  });

  $http.get('/api/satellites').then(function (response) {
    _this.availableSatellites = _(response.data).map(function (satellite) {
      satellite.units = JSON.parse(satellite.units);
      satellite.availableCommands = JSON.parse(satellite.availableCommands);
      return satellite;
    }).value();
    console.log(_this.availableSatellites);
  });

  this.scheduleCommand = function scheduleCommand(command, passNum) {
    var _this2 = this;

    console.log(passNum);
    $http.post('/api/commands/' + command._id + '/schedule', { SegmentId: passNum }).then(function (response) {
      console.log(response);
      _this2.unscheduledCommands = _(_this2.unscheduledCommands).filter(function (commandf) {
        return commandf._id !== command._id;
      }).value();
    });
  };

  this.getAssignedSegments = function getAssignedSegments(satellite, groundstation) {
    var _this3 = this;

    if ((satellite, groundstation)) {
      $http.get('/api/satellites/' + satellite + '/assignedSegments?groundstation=' + groundstation).then(function (response) {
        console.log(response.data);
        _this3.segments = response.data;
      });
    }
  };
});
//# sourceMappingURL=tracker.controller.js.map
