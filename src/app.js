let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');

function requireHTTPS(req, res, next) {
	// The 'x-forwarded-proto' check is for Heroku
	if (
		!req.secure &&
		req.get('x-forwarded-proto') !== 'https' &&
		process.env.NODE_ENV !== 'development'
	) {
		return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
}
app.use(requireHTTPS);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.of('/stream').on('connection', stream);

const PORT = process.env.PORT || 3000;
server.listen(PORT);
