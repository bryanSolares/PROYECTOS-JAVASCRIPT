const express = require('express');
const path = require('path');
const SocketIO = require('socket.io')

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Statics files
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
const server = app.listen(app.get('port'), (req, res) => {
    console.log(`server on port ${app.get('port')}`)
})

//Websockts
const io = SocketIO(server);
io.on('connection', (socket) => {
    //console.log('new connection ', socket.id)
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});