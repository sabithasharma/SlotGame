var express = require('express');
var http = require('http');
var io = require('socket.io');


var app = express();
app.use(express.static('./public'));
//Specifying the public folder of the server to make the html accesible using the static middleware

var server = http.createServer(app).listen(3000);
//Server listens on the port 8124
io = io.listen(server);
/*initializing the websockets communication , server instance has to be sent as the argument */

io.sockets.on("connection", function (socket) {
    /*Associating the callback function to be executed when client visits the page and 
      websocket connection is made */
    /*sending data to the client , this triggers a message event at the client side */
    console.log('Socket.io Connection with the client established');
    socket.on("message", function (data) {
        console.log(data.type);
        data = JSON.parse(data);
        switch (data.type) {
            case "randomNumber": sendRandomNumber(socket);
                break;
        }

    });
});

function sendRandomNumber(socket) {
    var number = [];
    var min = 0, max = 5;
    for (var i = 0; i < 3; i++) {
        number.push(Math.floor(Math.random() * max) + min);
    }
    var data = {
        type: "randomNumber",
        // number: Math.floor(Math.random() * 100000).toString().substring(0, 3)
        number: number,
        bonus: Math.random() >= 0.5
    }
    socket.send(JSON.stringify(data));
}