'use strict';

var BoardsService = require('./boards');

var ScoresService = function () {
    function ScoresService() {
        this.scores = new Map();
    }

    ScoresService.prototype.isBetter = function isBetter(newScore, oldScore, direction) {
        if (direction === 1) {
            // higher is better
            return newScore > oldScore;
        } else {
            return newScore < oldScore;
        }
    };

    ScoresService.prototype.getScores = function getScores(boardId) {
        var _this = this;

        var board = BoardsService.getSingleBoard(boardId);
        if (!board || !this.scores.has(board.id)) {
            console.log('board not found! ' + boardId);
            return [];
        }

        var results = [];
        for (var _iterator = this.scores.get(board.id).values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var score = _ref;

            results.push(score);
        }

        return results.sort(function (a, b) {
            return _this.isBetter(b.score, a.score, board.rankDirection);
        });
    };

    ScoresService.prototype.addScore = function addScore(boardId, userId, score) {
        var board = BoardsService.getSingleBoard(boardId);
        if (!board) {
            console.log('addScore: can\'t find board: ', boardId);
            return false;
        }

        var scoreObj = { score: score, submitted: new Date(), userId: userId };
        if (!this.scores.has(board.id)) {
            this.scores.set(board.id, new Map());
            this.scores.get(board.id).set(userId, scoreObj);
        } else {
            if (this.scores.get(board.id).has(userId)) {
                if (this.isBetter(score, this.scores.get(board.id).get(userId).score, board.rankDirection)) {
                    this.scores.get(board.id).set(userId, scoreObj);
                }
            } else {
                this.scores.get(board.id).set(userId, scoreObj);
            }
        }

        return true;
    };

    return ScoresService;
}();

module.exports = new ScoresService();