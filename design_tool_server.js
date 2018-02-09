var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
//var io = require('socket.io')(http);

//var fs = require('fs');
//var os = require('os');

app.use('/images', express.static(__dirname +"/images") );
app.use('/js', express.static(__dirname + "/js"));
app.use('/css', express.static(__dirname + "/css"));
app.use('/images', express.static(__dirname +"/inputImages") );
//var server = app();

/*app.configure(function(){
    server.use('/images', app.static(__dirname + '/images'));
    server.use('/js', app.static(__dirname + '/js'));

});*/

//app.use(express.static('js'));
app.get('/', function(req, res){
   // res.sendFile('/index.html' + {});
    res.sendFile(__dirname + '/MultiTouchSkin_v1.html');
});

/*io.on('connection', function(socket){
    console.log('client connected');

    socket.emit('raw data', {hello: 'world'});

    socket.on('my other event', function(data){
        console.log(data);
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    })

});*/

http.listen(3000, function(){
    console.log('Listening on *: 3000');
})