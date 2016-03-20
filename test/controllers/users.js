var express = require('express');
var restRouter = express.Router();
var UsersController = require('../../controllers/users');
var usersController = new UsersController(restRouter);
var httpMocks = require('node-mocks-http');
var should = require('should');
var User = require('../../models/user');

function getResponse() {
	return httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
}

describe('UsersController', function() {
	describe('#getUsers()', function() {
		it('should return 200 OK', function(done) {

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/users'
			});

			res.on('end', function() {
				res.statusCode.should.equal(200);
				done();
			});

			usersController.getUsers(req, res);
		});
	});
});

describe('UsersController', function() {
	before(function() {
		// add test data
		var userInfo = {username: 'test', email: 'test@gmail.com'};
		var _user = new User(userInfo);
		_user.save(function(err) {
			if (err)
				throw err;

		});
		
	});
	describe('#getSingleUser(req, res)', function() {
		it('should return user by username', function(done) {

			// newly added user
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/users/test',
				params: {
					username: 'test'
				}
			});

			res.on('end', function() {
				var data = res._getData();
				console.log(data);
				data.username.should.equal('test');
				data.email.should.equal('test@gmail.com');

				done();
			});

			usersController.getSingleUser(req, res);
		});
	});
});

describe('UsersController', function() {
	describe('#getSingleUser(req, res)', function() {
		it('should return Not Found', function(done) {

			// newly added user
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/users/' + 'blah',
				params: {
					username: 'blah'
				}
			});

			res.on('end', function() {
				var data = res._getData();
				data.should.equal('Not Found');
					
				done();
			});

			usersController.getSingleUser(req, res);
		});
	});
});

describe('UsersController', function() {
	describe('#postUser(req, res)', function() {
		it('should return status code 200', function(done) {

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'POST',
				url: '/api/users',
				body: {
					username: 'khal',
					email: 'khal.rahman@gmail.com'
				}
			});

			res.on('end', function() {
				res.statusCode.should.equal(200);
				user.username.should.equal('khal');
				user.email.should.equal('khal.rahman@gmail.com');

				done();
			});

			usersController.postUser(req, res);
		});
	});
});

describe('UsersController', function() {
	before(function() {
		// add test data
		var data = {username: 'khal', email: 'khal.rahman@gmail.com'};
	});
	describe('#putUser(req, res)', function() {
		it('should update existing user - 204', function(done) {

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'PUT',
				url: '/api/users/' + user.username,
				params: {
					username: user.username
				},
				body: {
					username: 'nevda',
					email: 'nevdanya@gmail.com'
				}
			});

			res.on('end', function() {
				res.statusCode.should.equal(204);
				user.username.should.equal('nevda');
				user.email.should.equal('nevdanya@gmail.com');

				done();
			});

			usersController.putUser(req, res);
		});
	});
});

describe('UsersController', function() {
	describe('#putUser(req, res)', function() {
		it('should create a new user - 201', function(done) {

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'PUT',
				url: '/api/users/' + 'blah',
				params: {
					username: 'blah'
				},
				body: {
					username: 'nevda',
					email: 'nevdanya@gmail.com'
				}
			});

			res.on('end', function() {
				res.statusCode.should.equal(201);
				user.username.should.equal('nevda');
				user.email.should.equal('nevdanya@gmail.com');

				done();
			});

			usersController.putUser(req, res);
		});
	});
});