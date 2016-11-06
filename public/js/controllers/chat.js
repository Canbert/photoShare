var socket = io();
$('form').submit(function(){
    socket.emit('userMsg', $('#msg').val());
    $('#msg').val('');
    return false;
});
socket.on('userMsg', function(msg){
    $('#messages').append($('<div class="callout">').text(msg));
});

socket.on('serverMsg', function(msg){
    $('#messages').append($(
        '<div class="alert callout" data-closable>' +
         msg +
        '<button class="close-button" aria-label="Dismiss alert" type="button" data-close>' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>'));
});