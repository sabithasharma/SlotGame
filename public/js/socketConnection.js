/**
 * @author - Sabitha Sharma L
 * @description- This file is used for receiving messages from server using socket connection
 */
var socket;
socket = io.connect("/");
var slotDisplay = new SlotDisplay();
var setResultOnUI = slotDisplay.setResultOnUI;
var setWinMessage = slotDisplay.setWinMessage;
var setBonus = slotDisplay.setBonus;
var setSpin = slotDisplay.setSpin;
socket.on("message", function (data) {
    data = JSON.parse(data);
    switch (data.type) {
        case "randomNumber":
            setResultOnUI(data.number);
            setWinMessage(data.number, socket);
        case "bonus":
            if (data.bonus) {
                setBonus();
            }
            break;
        default: break;
    }
});
/**
 * @description - Starts the game by listening of event of play button i.e click event
 */
function playGame () {
    setSpin(socket);
}

