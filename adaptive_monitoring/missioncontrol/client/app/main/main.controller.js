'use strict';
(function() {

function MainController($scope, $http, $interval) {

  this.commands = [];
  this.failedCommands = [];
  this.pendingCommands = [];

  this.locations = [];
  this.tracedLocs = [];
  this.satLoc = {};

  this.polyline = {
      stroke: {
          color: '#F00',
          weight: 3,
          opacity: 0.4
      },
      stroke2: {
        color: '#F00',
        weight: 3,
        opacity: 1.0
      }
  };

  $scope.self = this;

  this.satMarker = {
    idKey: 0,
    options: {
      icon: {
        anchor: {x: 15, y: 15},
        url: 'assets/images/sat_icon.png'
      },
      visible: false
    }
  };

  this.map = {
      center: {
          latitude: 0,
          longitude: 0
      },
      zoom: 2,
      options: {
          mapTypeId: 'satellite',
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          panControl: false,
          overviewMapControl: false,
          scaleControl: false,
          zoomControl: false,
          scrollwheel: false,
          styles: [
          {
              elementType: 'labels',
              featureType: 'all',
              stylers: [ { visibility: 'off' } ]
          }
          ]
      }
  };

  var changedPromise;

  this.satChanged = function() {
    this.refreshLocations();
    if(changedPromise != undefined) {
      $interval.cancel(changedPromise);
    }
    changedPromise = $interval(this.refreshLocation, 30000, 0, true, this.selectedSatellite);
    this.satMarker.options.visible = true;
  };

  // this.availableSatellites = [
  //   {
  //     _id: '1',
  //     name: 'LAICE'
  //   },
  //   {
  //     _id: '2',
  //     name: 'ION'
  //   }
  // ];

  $http.get('/api/satellites')
  .then((response) => {
    console.log(response);
    this.availableSatellites = response.data;
  });


  $http.get('/api/commands')
  .then((response) => {
    console.log(response);
    this.commands = response.data;
    this.failedCommands = _(this.commands).filter((command) => command.status === 'failed').value();
    this.pendingCommands = _(this.commands).filter((command) => command.status === 'pending').value();
    this.nextTenCommands = _(this.commands).filter((command) => command.status === 'pending').take(10).value();
  });

  this.refreshLocation = function(sat) {
    $http.get(`/api/satellites/${sat}/location`)
    .then(response => {
      let loc = response.data;
      $scope.self.tracedLocs.push(loc);
      $scope.self.satLoc = loc;
      console.log('Updated satellite position.');
    });
    $http.get(`/api/satellites/${sat}/futureLocation?interval=120`)
    .then(response => {
      let loc = response.data;
      $scope.self.locations.push(loc);
      console.log("Updated orbit trace.");
    });
  }

  this.refreshLocations = function() {
    $http.get(`/api/satellites/${this.selectedSatellite}/locations?interval=120`)
    .then(response => {
        let locs = response.data;
        let locations = _.map(locs, function(point) {
            return { latitude: point.latitude, longitude: point.longitude };
        });

        this.locations = locations;
        this.tracedLocs = [];
        this.tracedLocs.push(locations[0]);
        this.satLoc = locations[0];
        console.log(this.locations);
    });
  };
}

angular.module('missioncontrolApp')
  .controller('MainController', MainController);

})();
