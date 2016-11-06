
module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log('Socket.io chat: user connected');
        io.emit('serverMsg', 'User connected');

        socket.on('userMsg', function (msg) {
            console.log("Socket.io chat: " + msg.username + ' said ' + msg.message);
            io.emit('userMsg', msg);
        });

        socket.on('disconnect', function () {
            console.log('Socket.io chat: user disconnected');
            io.emit('serverMsg', 'User disconnected');
        });
    });
}