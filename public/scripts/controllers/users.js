(function() {
	'use strict';

	angular
		.modules('contollers')
		.controller('UsersCtrl', usersCtrl);

	usersCtrl.$inject = ['$scope'];

	function usersCtrl($scope) {
		
		$scope.getUsers = function() {

		};

		$scope.getSingleUser = function(username) {

		};

		$scope.addUser = function(userInfo) {

		};

		$scope.updateUser = function(username, userInfo) {

		};
	}

})();