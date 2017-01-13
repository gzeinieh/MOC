'use strict';

angular.module('missioncontrolApp').controller('AdminCtrl', function ($scope, $http, Auth, User, $state, modalService) {

  // Use the User $resource to fetch all users
  $scope.users = User.query();

  //  TODO:  get list of roles from a database than create here on client side
  $scope.roles = ['admin', 'standard', 'comms'];

  $scope['delete'] = function (user) {
    var index = this.$index;
    modalService.showModal({}, {}).then(function (result, index) {
      User.remove({ id: user._id });
      $scope.users.splice(index, 1);
    });
  };

  // $scope.delete = function(user) {
  //	if ($window.confirm("do you want to delete?")){
  //       User.remove({ id: user._id });
  //        $scope.users.splice(this.$index, 1);
  //}
  //};

  $scope.register = function (form) {
    $scope.submitted = true;
    if (form.$valid) {
      Auth.createNewUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
        role: $scope.user.role
      }).then(function () {
        // Account created, redirect to home
        $state.reload();
      });
    }
  };

  $scope.assign = function (form, user) {

    if (form.$valid) {
      User.update(user);
    }
  };
});
//# sourceMappingURL=admin.controller.js.map
