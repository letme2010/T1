try {
	var net = require('http');

	net.createServer(function(req, res) {
		res.writeHead(200, {
			'Content-Type' : 'text/plain'
		});
		res.end("Hello to nodejs server.");
	}).listen(9990);
} catch (e) {
	console.error(e);
}