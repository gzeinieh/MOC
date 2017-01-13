'use strict';

angular.module('missioncontrolApp').factory('Satellite', function ($resource) {
  return $resource('/api/satellites/:id/:controller', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    locations: {
      method: 'GET',
      params: {
        controller: 'location'
      }
    }

  });
});
//# sourceMappingURL=satellite.service.js.map
