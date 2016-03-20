(function() {
	'use strict';

	angular.module('services')
		.factory('mailerService', mailerService);

	mailerService.$inject = ['Restangular'];

	function mailerService(Restangular) {
		return {
			emailTo: function(email) {

			}
		};
	}
})();