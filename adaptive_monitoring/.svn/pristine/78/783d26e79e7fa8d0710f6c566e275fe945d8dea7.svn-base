'use strict';

angular.module('missioncontrolApp').controller('AllocatorCtrl', function ($scope, $http) {
  var _this = this;

  // $http.get(`/api/satellites/1/assignedSegments`)
  //   .then((response) => {
  //     console.log(response.data);
  //     this.segments = response.data;
  //   });

  $http.get('/api/groundstations').then(function (response) {
    _this.groundstations = response.data;
  });

  $http.get('/api/satellites').then(function (response) {
    _this.availableSatellites = response.data;
  });

  this.getSegments = function getSegments(satellite, groundstation) {
    var _this2 = this;

    if (satellite && groundstation) {
      $http.get('/api/satellites/' + satellite + '/segments?groundstation=' + groundstation).then(function (response) {
        _this2.segments = response.data;
      });
    }
  };

  this.assignSegment = function assignSegment(satellite, segment) {
    var _this3 = this;

    if (satellite && segment) {
      $http.put('/api/segments/' + segment, {
        assignedToSatId: satellite
      }).then(function (response) {
        var updatedSeg = response.data;
        console.log(updatedSeg);

        var idx = _(_this3.segments).findIndex(function (segment) {
          return segment._id === updatedSeg._id;
        });
        _this3.segments[idx] = updatedSeg;
      });
    }
  };

  this.unassignSegment = function unassignSegment(segment) {
    var _this4 = this;

    $http.put('/api/segments/' + segment, {
      assignedToSatId: null
    }).then(function (response) {
      var updatedSeg = response.data;
      console.log(updatedSeg);

      var idx = _(_this4.segments).findIndex(function (segment) {
        return segment._id === updatedSeg._id;
      });
      _this4.segments[idx] = updatedSeg;
    });
  };
});
//# sourceMappingURL=allocator.controller.js.map
