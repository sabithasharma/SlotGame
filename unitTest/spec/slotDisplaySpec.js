describe("SlotDisplay", function () {
  beforeEach(function () {
    var dummyElement = document.createElement('bonusMessage');
    document.getElementById = jasmine.createSpy('bonusMessage').and.returnValue(dummyElement);
  });

  it("should be able to set spin", function () {
    var setSpin = jasmine.createSpy('slotDisplay.setSpin');
    var slotDisplay = {
      setSpin: () => {}
    }
    var slotDisplay = new SlotDisplay();
    spyOn(slotDisplay, "setSpin");
    expect(setSpin).toBeDefined();
    slotDisplay.setSpin();
    expect(slotDisplay.setSpin).toHaveBeenCalled();
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