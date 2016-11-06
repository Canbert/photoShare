
module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log('user connected');
        io.emit('serverMsg', 'User connected');

        socket.on('userMsg', function (msg) {
            console.log('User message: ' + msg);
            io.emit('userMsg', msg);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
            io.emit('serverMsg', 'User disconnected');
        });
    });
}