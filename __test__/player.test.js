const player = require("../src/player");
const board = require("../src/gameboard");

test("Initializes human player correctly", () => {
  let newb = player.Player("Bob Dole", false);
  expect(newb.giveName()).toBe("Bob Dole");
  expect(newb.giveType()).toBe("Human");
});

test("Initializes computer player correctly", () => {
  let comp = player.Player("Iron Dude", true);
  expect(comp.giveName()).toBe("Iron Dude");
  expect(comp.giveType()).toBe("Computer");
});

test("Computer player gives an array of size 2 for a move", () => {
  let comp = player.Player("Iron Dude", true);
  expect(Array.isArray(comp.move())).toBe(true);
  expect(comp.move().length).toBe(2);
});

test("Computer player gives whole integers in the move array", () => {
  let comp = player.Player("Iron Dude", true);
  expect(Number.isInteger(comp.move()[0])).toBe(true);
  expect(Number.isInteger(comp.move()[1])).toBe(true);
});

test("Human player can't use computer-only functions", () => {
  let newb = player.Player("Bob Dole", false);
  let newBoard = board.Gameboard();
  expect(newb.move()).toBe(false);
  expect(newb.scan(newBoard.boardState())).toBe(false);
});

test("Scan won't accept non-arrays", () => {
  let comp = player.Player("Iron Dude", true);
  expect(comp.scan(1)).toBe(false);
});
