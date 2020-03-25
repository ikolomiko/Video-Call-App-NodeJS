let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.get('/.well-known/acme-challenge/NQeMTiv3dtCd2r6zksqwkK20K-9bT6PYSbcYPcZcMWM', 
(req,res) => {
    res.send('NQeMTiv3dtCd2r6zksqwkK20K-9bT6PYSbcYPcZcMWM.vy9Dgj_rJTvLQpbq090ysEtFlZqH6T3y8r2mCFSy60s');
});


io.of('/stream').on('connection', stream);

const PORT = process.env.PORT || 3000
server.listen(PORT);