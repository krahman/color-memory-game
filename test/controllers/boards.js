var express = require('express');
var restRouter = express.Router();
var BoardsService = require('../../services/boards');
var BoardsController = require('../../controllers/boards');
var boardsController = new BoardsController(restRouter);
var httpMocks = require('node-mocks-http');
var should = require('should');

describe('BoardsController', function() {
	
	var getResponse = function () {
		return httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
	};
		
	var board = null;
	beforeEach(function() {
		board = BoardsService.addBoard('score', 1);
	});

	describe('#constructor ()', function() {
		it('should have router and registerRoutes in constructor', function(done) {
			var controller = new BoardsController(restRouter);
			controller.should.have.property('router');
			controller.should.have.property('registerRoutes');


			controller.router.should.be.equal(restRouter);


			done();
		});
	});

	describe('#getBoards()', function() {
		it('should return 200 OK', function(done) {

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/leaderboards'
			});

			res.on('end', function() {
				res.statusCode.should.equal(200);
				done();
			});

			boardsController.getBoards(req, res);
		});
	});

	describe('#getSingleBoard(req, res)', function() {
		it('should return a board object', function(done) {

			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/leaderboards/' + board.id,
				params: {
					id: board.id
				}
			});

			res.on('end', function() {
				var data = res._getData();
				data.boardName.should.equal('score');
				data.rankDirection.should.equal(1);

				done();
			});

			boardsController.getSingleBoard(req, res);
		});
	});

	describe('#putBoard(req, res)', function() {
		var boardInfo = { boardName: 'dead' };
		
		before(function() {
			board.boardName.should.not.equal(boardInfo.boardName);
		});

		it('should update existing board - 204', function(done) {
			
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'PUT',
				url: '/api/leaderboards/' + board.id,
				params: {
					id: board.id
				},
				body: boardInfo
			});

			res.on('end', function() {
				var data = res._getData();
				res.statusCode.should.equal(204);

				done();
			});

			boardsController.putBoard(req, res);
		});

		after(function() {
			board.boardName.should.equal(boardInfo.boardName);
		});
	});

	describe('#putBoard(req, res)', function() {
		var  boardInfo = { id: 'dummyId', boardName: 'dead' };
		
		before(function() {
			should.not.exist(BoardsService.getSingleBoard(boardInfo.id));
		});

		it('should create new board if ID is not available - 201', function(done) {
			
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'PUT',
				url: '/api/leaderboards/' + boardInfo.id,
				params: {
					id: boardInfo.id
				},
				body: boardInfo
			});

			res.on('end', function() {
				var data = res._getData();
				res.statusCode.should.equal(201);

				done();
			});

			boardsController.putBoard(req, res);

			BoardsService.getBoards().filter(b => b.boardName === boardInfo.boardName).length.should.equal(1);
		});
	});

	describe('#postBoard(req, res)', function() {
		var  boardInfo = {boardName: 'new board',  rankDirection: 3};
		
		it('should save new dashboard', function(done) {
			
			var res = getResponse();
			var req = httpMocks.createRequest({
				method: 'POST',
				url: '/api/leaderboards',
				body: boardInfo
			});

			res.on('end', function() {
				var data = res._getData();
				res.statusCode.should.equal(200);

				done();
			});

			boardsController.postBoard(req, res);

			BoardsService.getBoards().filter(b => b.boardName === boardInfo.boardName).length.should.equal(1);
		});
	});

	afterEach(function() {
		BoardsService.boards = [];
	});

});