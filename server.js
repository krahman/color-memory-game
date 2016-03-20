var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restRouter = express.Router();
var fs = require('fs');
var accesslogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
var app = express();

app.use(morgan('combined', {stream: accesslogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', restRouter);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride());

var UsersController = require('./controllers/users');
var usersController = new UsersController(restRouter);

var ScoresController = require('./controllers/scores');
var scoresController = new ScoresController(restRouter);

app.use(function(err, req, res, next) {
	return res.sendStatus(500);
});

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
