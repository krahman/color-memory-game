var mongoose = require('mongoose');
var express = require('express');
var restRouter = express.Router();

var UsersController = require('./controllers/users');
var usersController = new UsersController(restRouter);

var BoardsController = require('./controllers/boards');
var boardsController = new BoardsController(restRouter);

var ScoresController = require('./controllers/scores');
var scoresController = new ScoresController(restRouter);

var app = express();

app.use('/api', restRouter);

app.use(express.static(__dirname + '/public'));

// App listener
var server = app.listen(3000, function() {
	var host = server.address().address,
		port = server.address().port;

	host = (host === '::' ? 'localhost' : host);
	console.log('listening at http://%s:%s', host, port);
});

// Connection to mongodb
mongoose.connect("mongodb://localhost/ColorMemoryApp");

// Database listener
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log('Connected to mongodb');
});
