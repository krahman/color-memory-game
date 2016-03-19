var BoardsService = require('../../services/boards');
var should = require('should');

describe('BoardsService', function() {
	var board = null;

	beforeEach(function() {
		board = BoardsService.addBoard('score', 1);
	});

	describe('#constructor ()', function() {
		it('should have a constructor called boards', function(done) {
			// test case, class should have a constructor called boards
			BoardsService.should.have.property('boards');

			// test case, boards should be an array
			BoardsService.boards.should.be.an.Array;

			done();
		});
	});

	describe('#getBoards()', function() {
		it('should return an Array', function(done) {
			// test case check method returns an array
			BoardsService.getBoards().should.be.an.Array;

			done();
		});
	});

	describe('#getSingleBoard(boardId)', function() {
		it('should return an object', function(done) {
			// test case, getBoards should return an array
			BoardsService.getBoards().should.be.an.Array;

			// test case, boards size should equal 1
			BoardsService.getBoards().length.should.equal(1);
			BoardsService.getBoards()[0].should.have.property('boardName');
			BoardsService.getBoards()[0].should.have.property('rankDirection');

			done();
		});
	});

	describe('#addBoard(boardName, rankDirection)', function() {
		it('should successfully save and return a board object', function(done) {
			// test case, add board test case
			var newBoard = board;
			newBoard.should.be.an.Object;
			newBoard.should.have.property('id');
			newBoard.should.have.property('boardName');
			newBoard.should.have.property('rankDirection');

			// test case, duplicate test case : should not add the same board
			should.not.exist(BoardsService.addBoard('score', 1));

			done();
		});
	});

	describe('#updateBoard(boardId, info)', function() {
		it('should successfully update and return a board object', function(done) {

			// test case, add board test case
			BoardsService.updateBoard(board.id, {boardName: 'test', rankDirection: 2}).should.equal(true);

			done();
		});
	});

	afterEach(function() {
		BoardsService.boards = [];
	});
});

