'use strict';
 
var uuid = require('node-uuid');
 
class UsersService {
    constructor() {
        this.Users = [];
    }
 
    getUsers() {
        return this.Users;
    }
 
    addUser(user) {
        if (!user && this.Users.filter(p => (p.name === user.name && p.email === user.email)).length > 0) {
            return false;
        }
 
        user.id = uuid.v4();
 
        this.Users.push(user);
        return true;
    }

    getSingleUser(userId) {
        var user = this.Users.filter(p => p.id === userId)[0];
 
        return user || null;
    }
 
    updateUser(userId, data) {
        var user = this.getSingleUser(userId);
        if (user) {
            user.name = data.name ? data.name : user.name;
            user.email = data.email ? data.email : user.email;
 
            return true;
        }
        return false;
    }

}
 
module.exports = new UsersService();