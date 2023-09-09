const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

console.log('Welcome to RealTime Chat')
app.get('/', (req, res) => {
    //   res.send('<h1>Hello Putur Putur</h1>');
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// this will emit the event to all connected sockets
// io.emit('some event', {
//     someProperty: 'some value',
//     otherProperty: 'other value'
//   }); 

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});