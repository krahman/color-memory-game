(function() {
	'use strict';

	angular.module('services')
		.factory('scoresServices', scoresServices);

	scoresServices.$inject = ['Restangular'];

	function scoresServices (Restangular) {
		var service = Restangular.service('scores');
		
		return service;
	}
})();