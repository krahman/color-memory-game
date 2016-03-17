'use strict';
 
var UsersService = require('../services/users');
 
class UsersController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }
 
    registerRoutes() {
        this.router.get('/users', this.getUsers.bind(this));
        this.router.get('/users/:id', this.getSingleUser.bind(this));
        this.router.post('/users', this.postUser.bind(this));
        this.router.put('/users/:id', this.putUser.bind(this));
    }
 
    getUsers(req, res) {
        var users = UsersService.getUsers();
        res.send(users);
    }
 
    getSingleUser(req, res) {
        var id = req.params.id;
        var user = UsersService.getSingleUser(id);
 
        if (!user) {
            res.sendStatus(404);
        } else {
            res.send(user);
        }
    }
 
    putUser(req, res) {
        var id = req.params.id;
        var existingUser = UsersService.getSingleUser(id);
 
        if (!existingUser) {
            let userInfo = req.body;
            userInfo.id = id;
            if (UsersService.addUser(userInfo)) {
                res.setHeader('Location', '/users/' + id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (UsersService.updateUser(id, req.body)) {
                console.log(req.body);
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }
 
    postUser(req, res) {
        var userInfo = req.body;
 
        if (UsersService.addUser(userInfo)) {
            res.setHeader('Location', '/users/' + userInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}

module.exports = UsersController;