'use strict';

angular.module('missioncontrolApp')
  .controller('AllocatorCtrl', function ($scope, $http) {
    // $http.get(`/api/satellites/1/assignedSegments`)
    //   .then((response) => {
    //     console.log(response.data);
    //     this.segments = response.data;
    //   });

    $http.get(`/api/groundstations`)
      .then((response) => {
        this.groundstations = response.data;
      });

    $http.get(`/api/satellites`)
      .then((response) => {
        this.availableSatellites = response.data;
      });

    this.getSegments = function getSegments(satellite, groundstation) {
      if (satellite && groundstation) {
        $http.get(`/api/satellites/${satellite}/segments?groundstation=${groundstation}`)
          .then((response) => {
            this.segments = response.data;
          });
      }
    };

    this.assignSegment = function assignSegment(satellite, segment) {
      if (satellite && segment) {
        $http.put(`/api/segments/${segment}`, {
          assignedToSatId: satellite
        })
        .then((response) => {
          let updatedSeg = response.data;
          console.log(updatedSeg);

          let idx = _(this.segments)
            .findIndex(segment => segment._id === updatedSeg._id);
          this.segments[idx] = updatedSeg;
        });
      }
    };

    this.unassignSegment = function unassignSegment(segment) {
      $http.put(`/api/segments/${segment}`, {
        assignedToSatId: null
      })
      .then((response) => {
        let updatedSeg = response.data;
        console.log(updatedSeg);

        let idx = _(this.segments)
          .findIndex(segment => segment._id === updatedSeg._id);
        this.segments[idx] = updatedSeg;
      });
    };
  });
