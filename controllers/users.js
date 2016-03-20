(function() {
    'use strict';

    var User = require('../models/user');

    var UsersController = function () {
        function UsersController(router) {
            this.router = router;
            this.registerRoutes();
        }

        UsersController.prototype.registerRoutes = function registerRoutes() {
            this.router.get('/users', this.getUsers.bind(this));
            this.router.get('/users/:username', this.getSingleUser.bind(this));
            this.router.post('/users', this.postUser.bind(this));
            this.router.put('/users/:username', this.putUser.bind(this));
        };

        UsersController.prototype.getUsers = function getUsers(req, res) {
            User.find({}, function(err, users) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(users);
                }
            });
        };

        UsersController.prototype.getSingleUser = function getSingleUser(req, res) {
            var username = req.params.username;

            User.findOne({username: username}, function(err, _user) {
                if (err) {
                    res.sendStatus(500);
                } else if (!_user) {
                    res.sendStatus(404);
                } else {
                    res.send(_user);
                }
            });
        };

        UsersController.prototype.putUser = function putUser(req, res) {
            var username = req.params.username;
            var userInfo = req.body;

            User.findOne({username: username}, function(err, _user) {
                if (err) {
                    res.sendStatus(500);
                } else if (!_user) {
                    res.sendStatus(404);
                } else {
                    _user.username = userInfo.username;
                    _user.email = userInfo.email;
                    _user.save();

                    res.sendStatus(200);
                }
            });
        };

        UsersController.prototype.postUser = function postUser(req, res) {
            var userInfo = req.body;

            User.findOne({username: userInfo.username}, function(err, _user) {
                if (err) {
                    res.sendStatus(500);
                } else if (!_user) {
                    var user = new User(userInfo);

                    user.save(function(err) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    });

                } else {
                    res.sendStatus(409);
                }
            });
        };

        return UsersController;
    }();

    module.exports = UsersController;
})();