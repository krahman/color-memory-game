(function() {
	'use strict';

	angular.module('colorMemoryApp', ['restangular', 'ui.bootstrap', 'contollers', 'services', 'directives'])
		.config(function(RestangularProvider) {
			var restUrl = "";
			if (window.location.hostname === 'localhost') {
				restUrl = "http://localhost:8080/api";
			} else {
				var prodUrl = window.location.href.substring(0, window.location.href);
				restUrl = prodUrl + '/api';
			}

			RestangularProvider.setBaseUrl(restUrl);
		});
})();
