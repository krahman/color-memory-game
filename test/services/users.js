var UsersService = require('../../services/users');
var should = require('should');

describe('UsersService', function() {
	var user  = {name: 'khal', email: 'khal.rahman@gmail.com'};
	beforeEach(function() {
		user = UsersService.addUser(user);
	});

	describe('#constructor ()', function() {
		it('should have instance variable of users', function(done) {
			UsersService.should.have.property('users');

			done();
		});
	});

	describe('#getUsers()', function() {
		it('should return an array without error', function(done) {
			UsersService.getUsers().should.be.an.Array;

			done();
		});
	});

	describe('#addUser(user)', function() {
		it('should add user without error', function(done) {
			var newUser = UsersService.addUser({name: 'nevda', email: 'khal.rahman@gmail.com'});
			newUser.should.be.an.instanceOf(Object);
			newUser.should.have.property('name');
			newUser.should.have.property('email');

			done();
		});
	});


	describe('#getSingleUser(userId)', function() {
		it('should find user by id without error', function(done) {
			var foundUser = UsersService.getSingleUser(user.id);
			foundUser.should.be.an.instanceOf(Object);
			foundUser.should.have.property('name');
			foundUser.should.have.property('email');

			done();
		});
	});

	describe('#updateUser(userId, data)', function() {
		it('should update user without error', function(done) {
			// update name
			var userInfo = {name: 'nevda', email: 'khal.rahman@gmail.com'};
			var foundUser = UsersService.getSingleUser(user.id);

			foundUser.name.should.not.equal(userInfo.name);
			UsersService.updateUser(user.id, userInfo);
			foundUser.name.should.equal(userInfo.name);

			done();
		});
	});

	describe('#getUserByEmail(email)', function() {
		it('should find user by email without error', function(done) {
			var foundUser = UsersService.getUserByEmail(user.email);
			foundUser.should.be.an.instanceOf(Object);
			foundUser.should.have.property('id');
			foundUser.should.have.property('name');
			foundUser.should.have.property('email');

			done();
		});
	});

	afterEach(function() {
		UsersService.users = [];
	})
});