var express = require('express');
var restRouter = express.Router();
var UsersService = require('../../services/users');
var UsersController = require('../../controllers/users');
var usersController = new UsersController(restRouter);
var httpMocks = require('node-mocks-http');
var should = require('should');

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
		var data = {name: 'khal', email: 'khal.rahman@gmail.com'};
		return UsersService.addUser(data);
	});
	describe('#getSingleUser(req, res)', function() {
		it('should return user by id', function(done) {

			// newly added user
			var user = UsersService.getUsers()[0];

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/users/' + user.id,
				params: {
					id: user.id
				}
			});

			res.on('end', function() {
				var data = res._getData();
				data.name.should.equal('khal');
				data.email.should.equal('khal.rahman@gmail.com');

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
					id: 'blah'
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
				data: {
					name: 'khal',
					email: 'khal.rahman@gmail.com'
				}
			});

			res.on('end', function() {
				var user = UsersService.getUsers()[0];
				res.statusCode.should.equal(200);
				user.name.should.equal('khal');
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
		var data = {name: 'khal', email: 'khal.rahman@gmail.com'};
		return UsersService.addUser(data);
	});
	describe('#putUser(req, res)', function() {
		it('should update existing user - 204', function(done) {

			var user = UsersService.getUsers()[0];
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'PUT',
				url: '/api/users/' + user.id,
				params: {
					id: user.id
				},
				body: {
					name: 'nevda',
					email: 'nevdanya@gmail.com'
				}
			});

			res.on('end', function() {
				var user = UsersService.getUsers()[0];
				res.statusCode.should.equal(204);
				user.name.should.equal('nevda');
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

			var user = UsersService.getUsers()[0];
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'PUT',
				url: '/api/users/' + 'blah',
				params: {
					id: 'blah'
				},
				body: {
					name: 'nevda',
					email: 'nevdanya@gmail.com'
				}
			});

			res.on('end', function() {
				var user = UsersService.getUsers()[0];
				res.statusCode.should.equal(201);
				user.name.should.equal('nevda');
				user.email.should.equal('nevdanya@gmail.com');

				done();
			});

			usersController.putUser(req, res);
		});
	});
});