(function() {
	'use strict';

	angular.module('services')
		.factory('scoresServices', scoresServices);

	function scoresServices () {
		return {
			getScores: function() {

			},
			getMyBestScores: function(username) {

			},
			getMyScores: function(username) {

			},
			submitScore: function(username, score) {

			}
		};
	}
})();