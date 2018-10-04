var socket = io.connect("/");
var ASSET_PATH = './assets';
var blankMsg = '-------------';
document.getElementById('bonusMessage').innerHTML = blankMsg;
socket.on("message", function (data) {
    data = JSON.parse(data);
    switch (data.type) {
        case "randomNumber":
            setResultOnUI(data.number);
            setMessage(data.number);
            if (data.bonus) {
                setBonus();
            }
            break;
        default: break;
    }
});

document.getElementById("playButton").addEventListener('click', function () {
    document.getElementById('bonusMessage').innerHTML = blankMsg;
    var data = {
        message: '',
        type: 'randomNumber'
    }
    socket.send(JSON.stringify(data));
});

