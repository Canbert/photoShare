var socket = io();
$('form').submit(function(){
    socket.emit('userMsg', $('#msg').val());
    $('#msg').val('');
    return false;
});
socket.on('userMsg', function(msg){
    $('#messages').append($('<li class="userMsg">').text(msg));
});

socket.on('serverMsg', function(msg){
    $('#messages').append($('<li class="serverMsg">').text(msg));
});