describe("SocketConnection", function () {
  beforeEach(function () {
  });

  it("should be able to play the game", function () {
    var playGame = jasmine.createSpy('playGame');
    expect(playGame).toBeDefined();
    playGame();
    expect(playGame).toHaveBeenCalled();
  });
});