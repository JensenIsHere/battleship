const player = require("../src/player");
const board = require("../src/gameboard");

test("Initializes human player correctly", () => {
  var newb = player.Player("Bob Dole", false);
  expect(newb.giveName()).toBe("Bob Dole");
  expect(newb.giveType()).toBe("Human");
});

test("Initializes computer player correctly", () => {
  var comp = player.Player("Iron Dude", true);
  expect(comp.giveName()).toBe("Iron Dude");
  expect(comp.giveType()).toBe("Computer");
});

test("Computer player gives an array of size 2 for a move", () => {
  var comp = player.Player("Iron Dude", true);
  expect(Array.isArray(comp.move())).toBe(true);
  expect(comp.move().length).toBe(2);
});

test("Computer player gives whole integers for a move", () => {
  var comp = player.Player("Iron Dude", true);
  expect(Number.isInteger(comp.move()[0])).toBe(true);
  expect(Number.isInteger(comp.move()[1])).toBe(true);
});

test("Human player can't use computer-only functions", () => {
  var newb = player.Player("Bob Dole", false);
  expect(newb.move()).toBe(false);
  expect(newb.scan(1)).toBe(false);
});
