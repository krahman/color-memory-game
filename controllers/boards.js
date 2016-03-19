(function() {
    'use strict';

    var BoardsService = require('../services/boards');

    var BoardsController = function () {
        function BoardsController(router) {
            this.router = router;
            this.registerRoutes();
        }

        BoardsController.prototype.registerRoutes = function registerRoutes() {
            this.router.get('/leaderboards', this.getBoards.bind(this));
            this.router.get('/leaderboards/:id', this.getSingleBoard.bind(this));
            this.router.post('/leaderboards', this.postBoard.bind(this));
            this.router.put('/leaderboards/:id', this.putBoard.bind(this));
        };

        BoardsController.prototype.getBoards = function getBoards(req, res) {
            var boards = BoardsService.getBoards();
            res.send(boards);
        };

        BoardsController.prototype.getSingleBoard = function getSingleBoard(req, res) {
            var id = req.params.id;
            var board = BoardsService.getSingleBoard(id);

            if (!board) {
                res.sendStatus(404);
            } else {
                res.send(board);
            }
        };

        BoardsController.prototype.putBoard = function putBoard(req, res) {
            var id = req.params.id;
            var existingBoard = BoardsService.getSingleBoard(id);

            if (!existingBoard) {
                var board = BoardsService.addBoard(req.body.boardName, req.body.rankDirection);
                if (board) {
                    res.setHeader('Location', '/leaderboards/' + board.id);
                    res.sendStatus(201);
                } else {
                    res.sendStatus(500);
                }
            } else {
                if (BoardsService.updateBoard(id, req.body)) {
                    res.sendStatus(204);
                } else {
                    res.sendStatus(404);
                }
            }
        };

        BoardsController.prototype.postBoard = function postBoard(req, res) {
            var board = BoardsService.addBoard(req.body.boardName, req.body.rankDirection);

            if (board) {
                res.setHeader('Location', '/leaderboards/' + board.id);
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };

        return BoardsController;
    }();

    module.exports = BoardsController;

})();