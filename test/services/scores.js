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

	describe('#getScores(boardId)', function() {
		it('should return an array of scores', function(done) {
			ScoresService.getScores.should.be.an.instanceOf(Function);
			ScoresService.getScores(board.id).should.be.an.instanceOf(Array);
			ScoresService.getScores(board.id).filter(s => s.id = user.id)[0].score.should.equal(100);

			done();
		});
	});

	describe('#addScore(boardId, userId, score)', function() {
		it('should be able to add score and return true', function(done) {
			ScoresService.getScores(board.id).filter(s => s.id = user.id)[0].score.should.equal(100);
			ScoresService.addScore(board.id, user.id, 1000).should.equal(true);
			ScoresService.getScores(board.id).filter(s => s.id = user.id)[0].score.should.equal(1000);

			done();
		});
	});

	afterEach(function() {
		UsersService.users = [];
		BoardsService.boards = [];
		ScoresService.scores = new Map();
	});
});