(function() {
	'use strict';

	angular
		.modules('contollers')
		.controller('ScoresCtrl', scoresCtrl);

	scoresCtrl.$inject = ['$scope'];

	function scoresCtrl($scope) {
		
		$scope.getScores = function() {

		};

		$scope.getMyScores = function(username) {

		};

		$scope.getMyBestScores = function(username) {

		};

		$scope.submitScore = function(username, score) {

		};
	}

})();