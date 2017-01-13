'use strict';
(function () {

  function MainController($scope, $http, $interval) {
    var _this = this;

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
          anchor: { x: 15, y: 15 },
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
        styles: [{
          elementType: 'labels',
          featureType: 'all',
          stylers: [{ visibility: 'off' }]
        }]
      }
    };

    var changedPromise;

    this.satChanged = function () {
      this.refreshLocations();
      if (changedPromise != undefined) {
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

    $http.get('/api/satellites').then(function (response) {
      console.log(response);
      _this.availableSatellites = response.data;
    });

    $http.get('/api/commands').then(function (response) {
      console.log(response);
      _this.commands = response.data;
      _this.failedCommands = _(_this.commands).filter(function (command) {
        return command.status === 'failed';
      }).value();
      _this.pendingCommands = _(_this.commands).filter(function (command) {
        return command.status === 'pending';
      }).value();
      _this.nextTenCommands = _(_this.commands).filter(function (command) {
        return command.status === 'pending';
      }).take(10).value();
    });

    this.refreshLocation = function (sat) {
      $http.get('/api/satellites/' + sat + '/location').then(function (response) {
        var loc = response.data;
        $scope.self.tracedLocs.push(loc);
        $scope.self.satLoc = loc;
        console.log('Updated satellite position.');
      });
      $http.get('/api/satellites/' + sat + '/futureLocation?interval=120').then(function (response) {
        var loc = response.data;
        $scope.self.locations.push(loc);
        console.log("Updated orbit trace.");
      });
    };

    this.refreshLocations = function () {
      var _this2 = this;

      $http.get('/api/satellites/' + this.selectedSatellite + '/locations?interval=120').then(function (response) {
        var locs = response.data;
        var locations = _.map(locs, function (point) {
          return { latitude: point.latitude, longitude: point.longitude };
        });

        _this2.locations = locations;
        _this2.tracedLocs = [];
        _this2.tracedLocs.push(locations[0]);
        _this2.satLoc = locations[0];
        console.log(_this2.locations);
      });
    };
  }

  angular.module('missioncontrolApp').controller('MainController', MainController);
})();
//# sourceMappingURL=main.controller.js.map
