var express = require('express');
var restRouter = express.Router();

var UsersController = require('./controllers/users');
var usersController = new UsersController(restRouter);

var app = express();
app.use('/api', restRouter);

var server = app.listen(3000, function() {
	var host = server.address().address,
		port = server.address().port;

	host = (host === '::' ? 'localhost' : host);
	console.log('listening at http://%s:%s', host, port);

});