(function() {
	'use strict';

	angular.module('directives')
		.directive('colorBoard', colorBoard)
		.controller('BoardCtrl', BoardCtrl)
		.directive('colorCell', colorCell);

	//------------------------
	// Board directive object
	//------------------------
	colorBoard.$inject = [];

	function colorBoard() {

		var directive = {};
		var colors = ['#00A388', '#FF6138', '#BEDB39', '#FF8598', '#2185C5',
			'#413659', '#F7E967', '#8A0917', '#00A388', '#FF6138', '#BEDB39',
			'#FF8598', '#2185C5', '#413659', '#F7E967', '#8A0917'];

		var generateBoard = function(rowsCount, colsCount) {
			var rows = [];
			var shuffledColors = _.shuffle(colors);

			angular.forEach(_.range(rowsCount), function () {
				var cell = [];
				angular.forEach(_.range(colsCount), function() {
					var col = {
						color: shuffledColors.shift(),
						flipped: false,
						matched: false,
						status: ''
					};
					cell.push(col);
				});

				// add cell to row
				rows.push(cell);
			});
			return rows;
		};

		directive.restrict = 'E';
		directive.controller = BoardCtrl;
		directive.scope = {
			rows: '=',
			cols: '='
		};

		directive.templateUrl = '/scripts/directives/color-board.html';
		directive.link = function(scope, element, attrs) {
			var rowsCount = scope.rows || 4; // default rows as 4
			var colsCount = scope.cols || 4; // default cols as 4

			scope.board = {
				rows: generateBoard(rowsCount, colsCount)
			};
		};

		return directive;
	}


	//--------------------
	// Board Controller
	//--------------------
	
	BoardCtrl.$inject = ['$scope'];

	function BoardCtrl ($scope) {

		$scope.board = {};
	}

	//------------------------
	// Color cells directive
	//------------------------

	function colorCell() {
		
		var directive = {};

		directive.controller = BoardCtrl;
		directive.restrict = 'A';
		directive.scope = {
			config: '='
		};
		directive.link = function(scope, element, attrs) {
			element.bind({
				click: function() {
					element.css('background-color', scope.config.color);
				}
			});
		};

		return directive;
	}

})();