(function() {
	'use strict';

	var ScoresService = require('../../services/scores');
	var BoardsService = require('../../services/boards');
	var UsersService = require('../../services/users');
	var should = require('should');

	describe('ScoresService', function() {
		
		var score = null, 
			board = null, 
			user = null;

		var userInfo = {name: 'khal', email: 'khal.rahman@gmail.com'};

		beforeEach(function() {
			user = UsersService.addUser(userInfo);
			board = BoardsService.addBoard('score', 1);
			
			ScoresService.addScore(board.id, user.id, 100).should.be.equal(true);
		});

		describe('#constructor()', function() {
			it('should have a constructor called scores, an Map object', function(done) {
				ScoresService.should.have.property('scores');
				ScoresService.scores.should.be.an.instanceOf(Map);

				done();
			});
		});

		describe('#isBetter(newScore, oldScore, direction)', function() {
			it('should return "newScore > oldScore" if direction is 1', function(done) {
				ScoresService.isBetter(1000, 100, 1).should.equal(true);
				ScoresService.isBetter(100, 1000, 1).should.equal(false);
				done();
			});
			it('should return "newScore < oldScore" if direction is 0', function(done) {
				ScoresService.isBetter(1000, 100, 0).should.equal(false);
				ScoresService.isBetter(100, 1000, 0).should.equal(true);
				
				done();
			});
		});

		describe('#getScores(boardId)', function() {
			it('should return an array of scores', function(done) {
				ScoresService.getScores.should.be.an.instanceOf(Function);
				ScoresService.getScores(board.id).should.be.an.instanceOf(Array);

				done();
			});
		});

		describe('#addScore(boardId, userId, score)', function() {
			it('should be able to add score and return true', function(done) {
				ScoresService.addScore(board.id, user.id, 1000).should.equal(true);

				done();
			});
		});

		afterEach(function() {
			UsersService.users = [];
			BoardsService.boards = [];
			ScoresService.scores = new Map();
		});
	});
})();