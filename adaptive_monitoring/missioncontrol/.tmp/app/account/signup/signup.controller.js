'use strict';

angular.module('missioncontrolApp').controller('SignupCtrl', function ($scope, Auth, $state) {
  $scope.user = {};
  $scope.errors = {};

  $scope.register = function (form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.createUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
        role: 'standard'
      }).then(function () {
        // Account created, redirect to home
        $state.go('main');
      })['catch'](function (err) {
        err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the sequelize errors
        if (err.name) {
          angular.forEach(err.fields, function (field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = err.message;
          });
        }
      });
    }
  };
});
//# sourceMappingURL=signup.controller.js.map
