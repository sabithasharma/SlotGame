/**
 * @author - Sabitha Sharma L
 * @description- This file is used for displaying the results received from server and trigerring server
 */

/**
 * SlotDisplay - Method for displaying UI
 */
var SlotDisplay = function () {
    const bonusMessage = 'Congrats You have a bonus !!!';
    const ASSET_PATH = './assets';
    const blankMsg = '-------------';
    var playAudio = new Audio('./assets/spinner.wav');
    var spinSet = false;
    const MAX_TIME_SPIN = 1000;
    const MAX_IMAGE_DISPLAY_SPIN = 6;
    const INTERVAL_NUM = 100;
    /**
     * @method setMessage - Set the message for Win
     * @param {*} number - receives the number from server
     * @param {*} socket - socket connection to send the messgae to server
     */
    const setWinMessage = (number = [], socket) => {
        var [first, second, third] = number;
        var resultMessage = document.getElementById('resultMessage');
        var data = {
            message: '',
            type: 'bonus'
        }
        if (first === second && second === third) {
            resultMessage.innerHTML = 'Big Win';
            socket.send(JSON.stringify(data));
        } else if (first === second || second === third || first === third) {
            resultMessage.innerHTML = 'Small Win';
            socket.send(JSON.stringify(data));
        } else {
            resultMessage.innerHTML = 'No Win';
        }
        return resultMessage.innerHTML;
    };

    /**
    * @method setResultOnUI - Set the result from server in the form of images
    * @param {*} number - receives the number from server
    */
    const setResultOnUI = (number = []) => {
        var [first, second, third] = number;
        var firstImage = document.getElementById('first-image');
        var secondImage = document.getElementById('second-image');
        var thirdImage = document.getElementById('third-image');
        firstImage.src = `${ASSET_PATH}/Symbol_${first}.png`;
        secondImage.src = `${ASSET_PATH}/Symbol_${second}.png`;
        thirdImage.src = `${ASSET_PATH}/Symbol_${third}.png`;
        return firstImage.src;
    };

    /**
     * @method setBonus - Set the bonus message
     */
    const setBonus = () => {
        document.getElementById('bonusMessage').innerHTML = bonusMessage;
        var audio = new Audio('./assets/bonus.wav');
        audio.play();
        return document.getElementById('bonusMessage').innerHTML;
    }

    /**
     * @method - sets the spin to play the game for 1 second
     * @param {*} socket 
     */
    const setSpin = (socket) => {
        if (!spinSet) {
            document.getElementById('bonusMessage').innerHTML = blankMsg;
            playAudio.play();
            const firstImage = document.getElementById('first-image');
            const secondImage = document.getElementById('second-image');
            const thirdImage = document.getElementById('third-image');
            var data = {
                message: '',
                type: 'randomNumber'
            }
            slotSpin = setInterval(function () {
                spinSet = true;
                var number = [];
                var min = 0, max = MAX_IMAGE_DISPLAY_SPIN;
                for (var i = 0; i < MAX_IMAGE_DISPLAY_SPIN; i++) {
                    number.push(Math.floor(Math.random() * max) + min);
                }
                var [first, second, third] = number;
                firstImage.src = `${ASSET_PATH}/Symbol_${first}.png`;
                secondImage.src = `${ASSET_PATH}/Symbol_${second}.png`;
                thirdImage.src = `${ASSET_PATH}/Symbol_${third}.png`;
            }, INTERVAL_NUM);
            setTimeout(() => {
                clearInterval(slotSpin);
                spinSet = false;
                playAudio.pause();
                playAudio.currentTime = 0;
                socket.send(JSON.stringify(data));
            }, MAX_TIME_SPIN);
        }
    }

    return {
        setWinMessage: setWinMessage,
        setResultOnUI: setResultOnUI,
        setBonus: setBonus,
        setSpin: setSpin
    }
}