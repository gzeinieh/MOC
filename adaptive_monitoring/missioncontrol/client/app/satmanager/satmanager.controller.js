'use strict';

angular.module('missioncontrolApp')
  .controller('SatManagerCtrl', function($scope, Satellite, modalService) {

  // Fetch all satellites through Satellite service
	$scope.satellites = Satellite.query();

  // Delete Satellite
  // This works to delete a Non-modal satellite object
	// $scope.delete = function(satellite) {
	//   Satellite.remove({id:satellite._id})
	//   $scope.satellites.splice(this.$index, 1);
	// };

  // Delete satellite object with warning Modal
  // Unable to fix inline splice, see line #30
  $scope.deleteSatellite = function(satellite) {

  // Retain current item index position for splicing on delete
  var index = this.$index;

    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete Satellite',
      headerText: 'Delete ' +satellite.name + '?',
      bodyText: 'Are you sure you want to delete this Satellite?'
    };

    modalService.showModal({}, modalOptions).then(function (result, index) {
      Satellite.remove({id:satellite._id});
      $scope.satellites.splice(index, 1);
      });
    }
});
