(function () {
    'use strict';

    var Score = require('../models/score');
    var User = require('../models/user');

    var ScoresController = function () {
        function ScoresController(router) {
            this.router = router;
            this.registerRoutes();
        }

        ScoresController.prototype.registerRoutes = function registerRoutes() {
            this.router.get('/scores', this.getScores.bind(this));
            this.router.get('/scores/:username', this.geMytScores.bind(this));
            this.router.get('/scores/:username/best', this.myBestScore.bind(this));
            this.router.post('/scores', this.submitScore.bind(this));
        };

        ScoresController.prototype.getScores = function getScores(req, res) {
            Score.find({}, function (err, scores) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(scores);
                }
            }).sort({score: -1});
        };

        ScoresController.prototype.geMytScores = function getMyScores(req, res) {
            var username = req.params.username;

            Score.find({username: username}, function (err, scores) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(scores);
                }
            }).sort({score: -1});
        };

        ScoresController.prototype.myBestScore = function myBestScore(req, res) {
            var username = req.params.username;

            Score.find({username: username}, function (err, scores) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(scores);
                }
            }).sort({score: -1}).limit(1);
        };

        ScoresController.prototype.submitScore = function submitScore(req, res) {
            var scoreInfo = req.body;
            var score = new Score(scoreInfo);

            User.findOne({username: scoreInfo.username}, function (err, user) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    if (!user) {
                        res.sendStatus(404);
                    } else {
                        score.save(function (err) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        });
                    }
                }
            });
        };

        return ScoresController;
    }();

    module.exports = ScoresController;

})();