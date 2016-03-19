'use strict';


var ScoresService = require('../services/scores');

var ScoresController = function () {
    function ScoresController(router) {
        this.router = router;
        this.registerRoutes();
    }

    ScoresController.prototype.registerRoutes = function registerRoutes() {
        this.router.get('/leaderboards/:leaderboardId/scores', this.getScores.bind(this));
        this.router.post('/leaderboards/:leaderboardId/scores', this.submitScore.bind(this));
    };

    ScoresController.prototype.getScores = function getScores(req, res) {
        var boardId = req.params.leaderboardId;
        var scores = ScoresService.getScores(boardId);
        res.send(scores);
    };

    ScoresController.prototype.submitScore = function submitScore(req, res) {
        var boardId = req.params.leaderboardId;
        ScoresService.addScore(boardId, req.body.userId, req.body.score);

        res.sendStatus(200);
    };

    return ScoresController;
}();

module.exports = ScoresController;