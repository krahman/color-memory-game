(function() {
	'use strict';

	angular
		.module('contollers')
		.controller('ScoresCtrl', ScoresCtrl);

	ScoresCtrl.$inject = ['$scope', 'scoresServices'];

	function ScoresCtrl($scope, scoresServices) {
		
		$scope.scores = [];

		$scope.getScores = function() {
			scoresServices
				.getList()
				.then(function(scores) {
					$scope.scores = scores;
				});
		};

		$scope.getMyScores = function(username) {

		};

		$scope.getMyBestScores = function(username) {

		};

		$scope.submitScore = function(username, score) {

		};
	}

})();