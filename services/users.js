'use strict';

var uuid = require('node-uuid');

var UsersService = function () {
    function UsersService() {

        this.users = [];
    }

    UsersService.prototype.getUsers = function getUsers() {
        return this.users;
    };

    UsersService.prototype.addUser = function addUser(user) {
        if (!user && this.users.filter(function (p) {
            return p.name === user.name && p.email === user.email;
        }).length > 0) {
            return false;
        }

        user.id = uuid.v4();

        this.users.push(user);
        return user;
    };

    UsersService.prototype.getSingleUser = function getSingleUser(userId) {
        var user = this.users.filter(function (p) {
            return p.id === userId;
        })[0];

        return user || null;
    };

    UsersService.prototype.getUserByEmail = function getUserByEmail(email) {
        var user = this.users.filter(function (p) {
            return p.email === email;
        })[0];

        return user || null;
    };

    UsersService.prototype.updateUser = function updateUser(userId, data) {
        var user = this.getSingleUser(userId);
        if (user) {
            user.name = data.name ? data.name : user.name;
            user.email = data.email ? data.email : user.email;

            return user;
        }
        return false;
    };

    return UsersService;
}();

module.exports = new UsersService();