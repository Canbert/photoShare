var socket = io();

$(document).ready(function () {
    socket.emit('newUser', user.username, function(data){
        if(data){
        }
    });
});
$('form').submit(function(){
    socket.emit('userMsg', {username: user.username, message: $('#msg').val()});
    $('#msg').val('');
    return false;
});
socket.on('userMsg', function(msg){
    $('#messages').append($(
        '<div class="callout">' +
        '<b>' + msg.username + ': </b>' +
        msg.message +
        '</div>'));
});

socket.on('serverMsg', function(msg){
    $('#messages').append($(
        '<div class="alert callout" data-closable>' +
         msg +
        '<button class="close-button" aria-label="Dismiss alert" type="button" data-close>' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>'));
});

socket.on('users', function (data){
    var html = '';
    for (i=0; i < data.length; i++){
        html += data[i] + '<br/>';
        $("#active-users").html(html);
    }
});