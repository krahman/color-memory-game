(function () {
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

        var generateBoard = function (rowsCount, colsCount) {
            var rows = [];
            var shuffledColors = _.shuffle(colors);

            angular.forEach(_.range(rowsCount), function () {
                var cell = [];
                angular.forEach(_.range(colsCount), function () {
                    var col = {
                        color: shuffledColors.shift(),
                        matched: false,
                        waiting: false
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
        directive.link = function (scope, element, attrs) {
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

    function BoardCtrl($scope) {

        $scope.board = {};
    }

    //------------------------
    // Color cells directive
    //------------------------

    colorCell.$inject = ['boardService', '$timeout'];
    function colorCell(boardService, $timeout) {

        var directive = {};

        directive.controller = BoardCtrl;
        directive.restrict = 'A';
        directive.scope = {
            config: '='
        };
        directive.link = function (scope, element, attrs) {
            element.bind({
                click: function () {
                    // click only when status is not waiting
                    if (!scope.config.waiting || !scope.config.matched) {

                        scope.config = boardService.getStatus(scope.config);

                        if (scope.config.waiting) {
                            element.css('background-color', scope.config.color);
                        } else {
                            element.css('background-color', scope.config.color);
                            $timeout(function () {
                                if (!scope.config.matched)
                                    element.css('background-color', '');
                            }, 1500);
                        }
                        console.log(scope.config);
                    }
                }
            });

            scope.$on('color-not-matched', function () {
                $timeout(function () {
                    if (scope.config.waiting)
                        element.css('background-color', '');
                }, 1500);
            });

            scope.$on('color-matched', function () {
                if (scope.config.waiting) {
                    scope.config.matched = true;
                    scope.config.waiting = false;
                }
            });
        };

        return directive;
    }

})();