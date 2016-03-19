var UsersService = require('../../services/users');

describe('UsersService', function() {
	describe('#getUsers()', function() {
		it('should return an array without error', function(done) {
			if (!Array.isArray(UsersService.getUsers()))
				throw err;
			done();
		});
	});
});

describe('UsersService', function() {
	describe('#addUser(user)', function() {
		it('should add user without error', function(done) {
			if (!UsersService.addUser({name: 'khal', email: 'khal.rahman@gmail.com'}))
				throw err;
			done();
		});
	});
});

describe('UsersService', function() {
	var data  = {name: 'khal', email: 'khal.rahman@gmail.com'};
	beforeEach(function() {
		return UsersService.addUser(data);
	});
	describe('#getSingleUser(userId)', function() {
		it('should find user by id without error', function(done) {
			var foundUser = UsersService.getSingleUser(UsersService.getUsers()[0].id);
			if (!foundUser || foundUser == null)
				throw err;
			done();
		});
	});
});

describe('UsersService', function() {
	beforeEach(function() {
		var data = {name: 'khal', email: 'khal.rahman@gmail.com'};
		return UsersService.addUser(data);
	});
	describe('#updateUser(userId, data)', function() {
		it('should update user without error', function(done) {
			var foundUser = UsersService.getSingleUser(UsersService.getUsers()[0].id);

			// update name
			UsersService.updateUser(foundUser.id, {name: 'nevda', email: 'khal.rahman@gmail.com'});
			if (foundUser.name !== 'nevda') {
				throw err;
			}
			done();
		});
	});
});

describe('UsersService', function() {
	beforeEach(function() {
		var data = {name: 'khal', email: 'khal.rahman@gmail.com'};
		return UsersService.addUser(data);
	});
	describe('#getSingleUser(email)', function() {
		it('should find user by email without error', function(done) {
			var foundUser = UsersService.getUserByEmail(UsersService.getUsers()[0].email);
			if (!foundUser || foundUser == null)
				throw err;
			done();
		});
	});
});