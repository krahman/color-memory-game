var express = require('express');
var restRouter = express.Router();
var ScoresService = require('../../services/scores');
var BoardsService = require('../../services/boards');
var UsersService = require('../../services/users');
var ScoresController = require('../../controllers/scores');
var scoresController = new ScoresController(restRouter);
var httpMocks = require('node-mocks-http');
var should = require('should');


describe('ScoresController', function() {

	var getResponse = function () {
		return httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
	};

	var score = null, 
		board = null, 
		user = null;

	var userInfo = {name: 'khal', email: 'khal.rahman@gmail.com'};

	beforeEach(function() {
		user = UsersService.addUser(userInfo);
		board = BoardsService.addBoard('score', 1);
		
		ScoresService.addScore(board.id, user.id, 100);
		console.log(ScoresService.getScores(board.id).length);
	});

	describe('#getScores(req, res)', function() {
		it('should send list of scores in array', function(done) {
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/leaderboards/' + board.id + '/scores',
				params: {
					leaderboardId: board.id
				}
			});

			res.on('end', function() {
				var data = res._getData();
				data.should.be.an.instanceOf(Array);
				data.length.should.equal(1);

				done();
			});

			scoresController.getScores(req, res);
		});
	});

	describe('#submitScore(req, res)', function() {
		it('should save submitted score', function(done) {
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'POST',
				url: '/api/leaderboards/' + board.id + '/scores',
				params: {
					leaderboardId: board.id
				},
				body: {
					userId: user.id,
					score: 1000
				}
			});

			res.on('end', function() {
				var data = res._getData();
				
				data.should.equal('OK');

				done();
			});

			scoresController.submitScore(req, res);
		});
	});

	afterEach(function() {
		UsersService.users = [];
		BoardsService.boards = [];
		ScoresService.scores = new Map();
	});

});