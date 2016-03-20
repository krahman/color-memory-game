(function() {
	'use strict';

	angular.module('services')
		.factory('boardService', boardService)
		.factory('notificationService', notificationService);

	boardService.$inject = ['notificationService'];
	function boardService(notificationService) {
		var flippedBox = [];

		var service = {};

		service.addFlippedBox = function(box) {
			flippedBox.push(box);
		};

		service.getFlippedBoxes = function() {
			return flippedBox;
		};

		service.getStatus = function(config) {
			if (flippedBox.length === 0) {
				config.waiting = true;
				config.flipped = true;
				
				flippedBox.push(config);
			} else {

				if (flippedBox[0].color === config.color) {
					config.matched = true;
					config.waiting = false;
					notificationService.colorMached();
				} else {
					config.waiting = false;
					config.flipped = false;

					notificationService.colorNotMached();
					flippedBox = [];
				}
			}

			return config;
		};

		return service;
	}

	notificationService.$inject = ['$rootScope'];

	function notificationService($rootScope) {
		var service = {};

		service.colorNotMached = function() {
			$rootScope.$broadcast('color-not-matched');
		};

		service.colorMached = function() {
			$rootScope.$broadcast('color-matched');
		};

		return service;
	}


})();