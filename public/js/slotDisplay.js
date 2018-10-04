var bonusMessage = 'Congrats You have a bonus !!!';
const setMessage = (number = []) => {
    var [first, second, third] = number;
    var resultMessage = document.getElementById('resultMessage');
    if (first === second && second === third) {
        resultMessage.innerHTML = 'Big Win';
    } else if (first === second || second === third || first === third) {
        resultMessage.innerHTML = 'Small Win';
    } else {
        resultMessage.innerHTML = 'No Win';
    }
    return resultMessage.innerHTML;
};

const setResultOnUI = (number = []) => {
    var [first, second, third] = number;
    var firstImage = document.getElementById('first-image');
    var secondImage = document.getElementById('second-image');
    var thirdImage = document.getElementById('third-image');
    firstImage.src = `${ASSET_PATH}/Symbol_${first}.png`;
    secondImage.src = `${ASSET_PATH}/Symbol_${second}.png`;
    thirdImage.src = `${ASSET_PATH}/Symbol_${third}.png`;
};

const setBonus = () => {
    document.getElementById('bonusMessage').innerHTML = bonusMessage;
    return 
}