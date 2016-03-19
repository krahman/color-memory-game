(function() {
    'use strict';

    var uuid = require('node-uuid');

    var LeaderBoardService = function () {
        function LeaderBoardService() {
            this.boards = [];
        }

        LeaderBoardService.prototype.getBoards = function getBoards() {
            return this.boards;
        };

        LeaderBoardService.prototype.getSingleBoard = function getSingleBoard(boardId) {
            return this.boards.filter(function (b) {
                return b.id === boardId;
            })[0] || null;
        };

        LeaderBoardService.prototype.addBoard = function addBoard(boardName, rankDirection) {
            var existingBoard = this.boards.filter(function (b) {
                return b.boardName === boardName;
            }).length;
            if (existingBoard) {
                return null;
            }

            var board = { boardName: boardName, rankDirection: rankDirection };
            board.id = uuid.v4();

            this.boards.push(board);

            return board;
        };

        LeaderBoardService.prototype.updateBoard = function updateBoard(boardId, info) {
            var board = this.getSingleBoard(boardId);
            if (board) {
                board.boardName = info.boardName ? info.boardName : board.boardName;
                board.rankDirection = info.rankDirection ? info.rankDirection : board.rankDirection;

                return true;
            }
            return false;
        };

        return LeaderBoardService;
    }();

    module.exports = new LeaderBoardService();

})();