(function() {
	'use strict';

	angular.module('services')
		.factory('usersServices', usersServices);

	function usersServices () {
		return {
			getUsers: function() {

			},
			getSingleUser: function(username) {

			},
			updateUser: function(username, userInfo) {

			},
			addUser: function(userInfo) {

			}
		};
	}
})();