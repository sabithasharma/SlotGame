var express = require('express');
/**
 * @Author - Sabitha Sharma L
 * @description - node server with socket connection. Responds with random number for slot machine game
 */
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
            case "bonus": sendBonus(socket);
                break;
        }

    });
});

/**
 * @method - sendRandomNumber
 * @param {*} socket 
 * @description - send 3 randoms numbers in an array
 */
function sendRandomNumber(socket) {
    var number = [];
    var min = 0, max = 5;
    for (var i = 0; i < 3; i++) {
        number.push(Math.floor(Math.random() * max) + min);
    }
    var data = {
        type: "randomNumber",
        // number: Math.floor(Math.random() * 100000).toString().substring(0, 3)
        number: number
    }
    socket.send(JSON.stringify(data));
    return number;
}
/**
 * @method - sendBonus
 * @param {*} socket 
 * @description - send boolean value as a bonus
 */
function sendBonus(socket) {
    var bonus = Math.random() >= 0.6;
    var data = {
        type: "bonus",
        bonus: bonus
    }
    socket.send(JSON.stringify(data));
    return bonus;
}