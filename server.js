var app = require('express')();

app.get('/', function(req, res) {
	res.send('Hello from Color Memory game');
});

var server = app.listen(3000, function() {
	var host = server.address().address,
		port = server.address().port;

	host = (host === '::' ? 'localhost' : host);
	console.log('listening at http://%s:%s', host, port);

});