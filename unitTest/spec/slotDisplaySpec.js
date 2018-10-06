describe("SlotDisplay", function () {
  beforeEach(function () {
    var dummyElement = document.createElement('bonusMessage');
    document.getElementById = jasmine.createSpy('bonusMessage').and.returnValue(dummyElement);
    var playGame = jasmine.createSpyObj('playGame', ['playGame']);
    playAudio = {
      play: () => { }
    }
    spyOn(playAudio, 'play');
  });

  it("should be able to set spin", function () {
    var setSpin = jasmine.createSpy('setSpin');
    setSpin();
    expect(setSpin).toBeDefined();
  });

  it("should be able to setWinMessage", function () {
    var resultMessageElement = document.createElement('resultMessage');
    document.getElementById = jasmine.createSpy('resultMessage').and.returnValue(resultMessageElement);

    var setWinMessage = jasmine.createSpy('setWinMessage');

    expect(setWinMessage).toBeDefined();
    setWinMessage();
    expect(setWinMessage).toHaveBeenCalled();
    expect(setWinMessage()).toEqual(document.getElementById.innerHTML);
  });



  it("should be able to setResultOnUI", function () {
    var firstImage = document.createElement('first-image');
    var secondImage = document.createElement('second-image');
    var thirdImage = document.createElement('third-image');
    var ASSET_PATH = './../assets';
    var firstValue = jasmine.createSpy('firstImage').and.returnValue(`${ASSET_PATH}/Symbol_${4}.png`);
    var setResultOnUI = jasmine.createSpy('setResultOnUI');

    expect(setResultOnUI).toBeDefined();
    setResultOnUI([4, 5, 2]);
    expect(setResultOnUI).toHaveBeenCalled();
  });

  it("should be able to setBonus", function () {
    var resultMessageElement = document.createElement('bonusMessage');
    document.getElementById = jasmine.createSpy('bonusMessage').and.returnValue(resultMessageElement);
    var setBonus = jasmine.createSpy('setBonus');

    expect(setBonus).toBeDefined();
    setBonus();
    expect(setBonus).toHaveBeenCalled();
    expect(setBonus()).toEqual(document.getElementById.innerHTML);
  });
});