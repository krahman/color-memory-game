'use strict';
 
var uuid = require('node-uuid');
 
class UsersService {
    constructor() {
        this.users = [];
    }
 
    getUsers() {
        return this.users;
    }
 
    addUser(user) {
        if (!user && this.users.filter(p => (p.name === user.name && p.email === user.email)).length > 0) {
            return false;
        }
 
        user.id = uuid.v4();
 
        this.users.push(user);
        return user;
    }

    getSingleUser(userId) {
        var user = this.users.filter(p => p.id === userId)[0];
 
        return user || null;
    }

    getUserByEmail(email) {
        var user = this.users.filter(p => p.email === email)[0];

        return user || null;
    }
 
    updateUser(userId, data) {
        var user = this.getSingleUser(userId);
        if (user) {
            user.name = data.name ? data.name : user.name;
            user.email = data.email ? data.email : user.email;
 
            return user;
        }
        return false;
    }

}
 
module.exports = new UsersService();