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
const BONUS_NUM = 0.6;
const MAX_NUMBER =  5;
const MAX_ARRAY_NUM = 3;
//Server listens on the port 8124
io = io.listen(server);
/*initializing the websockets communication , server instance has to be sent as the argument */

io.sockets.on("connection", (socket) => {
    /*Associating the callback function to be executed when client visits the page and 
      websocket connection is made */
    /*sending data to the client , this triggers a message event at the client side */
    console.log('Socket.io Connection with the client established');
    socket.on("message", (data) => {
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
sendRandomNumber = (socket) => {
    const number = [];
    const min = 0, max = MAX_NUMBER;
    for (var i = 0; i < MAX_ARRAY_NUM; i++) {
        number.push(Math.floor(Math.random() * max) + min);
    }
    const data = {
        type: "randomNumber",        
        number: number
    }
    socket.send(JSON.stringify(data));
    return number;
}
// number: Math.floor(Math.random() * 100000).toString().substring(0, 3)
/**
 * @method - sendBonus
 * @param {*} socket 
 * @description - send boolean value as a bonus
 */
sendBonus = (socket) => {
    const bonus = Math.random() >= BONUS_NUM;
    const data = {
        type: "bonus",
        bonus: bonus
    }
    socket.send(JSON.stringify(data));
    return bonus;
}