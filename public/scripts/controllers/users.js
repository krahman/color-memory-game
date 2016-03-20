(function() {
	'use strict';

	angular
		.module('contollers')
		.controller('UsersCtrl', UsersCtrl);

	UsersCtrl.$inject = ['$scope', 'usersServices'];

	function UsersCtrl($scope, usersServices) {
		
		$scope.users = [];

		$scope.getUsers = function() {
			console.log('test');
			usersServices
				.getList()
				.then(function(users) {
					$scope.users = users;
				});
		};

		$scope.getSingleUser = function(username) {

		};

		$scope.addUser = function(userInfo) {

		};

		$scope.updateUser = function(username, userInfo) {

		};


	}

})();