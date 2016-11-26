
module.exports = function (io) {

    var users = [];

    io.on('connection', function (socket) {
        console.log('Socket.io chat: user connected');
        io.emit('serverMsg', 'User connected');

        socket.on('newUser',function (data, callback) {
            if (users.indexOf(data) != -1){
                callback(false);
            } else {
                callback(true);
                socket.user = data;
                users.push(socket.user);
                io.sockets.emit('users', users);
            }
        });

        socket.on('userMsg', function (msg) {
            console.log("Socket.io chat: " + msg.username + ' said ' + msg.message);
            io.emit('userMsg', msg);
        });

        socket.on('disconnect', function () {
            console.log('Socket.io chat: user disconnected');
            io.emit('serverMsg', 'User disconnected');
            if(!socket.user) return;
            users.splice(users.indexOf(socket.user),1);
            io.sockets.emit('users', users);
        });
    });
}