(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User = require('../models/user');
    
    var UsersService = function () {
        function UsersService() {
            this.users = [];
        }

        UsersService.prototype.getUsers = function getUsers() {
            var self = this;
            User.find({}, function(err, users) {
                if (err)
                    throw err;

                self.users = users;
            });
            return self.users;
        };

        UsersService.prototype.addUser = function addUser(user) {
            var self = this;
            User.findOne({email: user.email}, function(err, u) {
                if (err)
                    throw err;

                if (u)
                    return false;

                var _user = new User(user);
                _user.save(function(err) {
                    if (err)
                        throw err;

                    self.users = self.getUsers();
                });
            });

            return true;
        };

        UsersService.prototype.getSingleUser = function getSingleUser(username) {
            return this.users.filter(function(user) {
                return user.username === username;
            })[0];
        };

        UsersService.prototype.updateUser = function updateUser(username, data) {
            User.update({username: username}, data, null, function(err, user) {
                if (err)
                    throw err;

                user.username = data.username;
                user.email = data.email;
            });
            
            return true;
        };

        return UsersService;
    }();

    module.exports = new UsersService();
})();