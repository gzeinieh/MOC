'use strict';

describe('Controller: CommandlogCtrl', function () {

  // load the controller's module
  beforeEach(module('missioncontrolApp'));

  var CommandlogCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommandlogCtrl = $controller('CommandlogCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
