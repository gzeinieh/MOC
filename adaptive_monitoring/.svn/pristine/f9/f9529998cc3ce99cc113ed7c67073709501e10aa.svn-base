'use strict';

angular.module('missioncontrolApp').factory('User', function ($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    update: {
      method: 'PUT'
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
});
//# sourceMappingURL=user.service.js.map
