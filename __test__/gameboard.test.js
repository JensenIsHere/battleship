const board = require("../src/gameboard");

test("Places a carrier horizontally at (0, 0)", () => {
  newBoard = board.Gameboard();
  expect(newBoard.placeShip("carrier", 5, [0, 0], "h")).toBe(true);
});

test("Places a carrier vertically at (0, 0)", () => {
  newBoard = board.Gameboard();
  expect(newBoard.placeShip("carrier", 5, [0, 0], "v")).toBe(true);
});

test("Prevents ship placement when a ship already exists in its path", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [2, 3], "h");
  expect(newBoard.placeShip("patrol boat", 2, [1, 5], "v")).toBe(false);
});

test("Prevents ship placement when at the edge of the board", () => {
  newBoard = board.Gameboard();
  expect(newBoard.placeShip("carrier", 5, [2, 6], "h")).toBe(false);
});

test("Attack a blank square and misses", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [2, 3], "h");
  expect(newBoard.receiveAttack(1, 5)).toBe(0);
});

test("Attack a ship and hits", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [2, 3], "h");
  expect(newBoard.receiveAttack(2, 5)).toBe(1);
});

test("Attacks a blank previously attacked square and fails", () => {
  newBoard = board.Gameboard();
  newBoard.receiveAttack(2, 5);
  expect(newBoard.receiveAttack(2, 5)).toBe(-1);
});

test("Attacks a previously attacked ship square and fails", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [2, 3], "h");
  newBoard.receiveAttack(2, 5);
  expect(newBoard.receiveAttack(2, 5)).toBe(-1);
});

test("Completely sink a ship", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [0, 0], "h");
  for (let i = 0; i < 5; i++) newBoard.receiveAttack(0, i);
  expect(newBoard.shipState()[0].dmg()).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("allGone is false when ships still alive", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [0, 0], "h");
  expect(newBoard.allGone()).toBe(false);
});

test("allGone is true when all ships destroyed", () => {
  newBoard = board.Gameboard();
  newBoard.placeShip("carrier", 5, [0, 0], "h");
  newBoard.placeShip("patrol boat", 2, [5, 6], "v");
  for (let i = 0; i < 5; i++) newBoard.receiveAttack(0, i);
  for (let i = 0; i < 2; i++) newBoard.receiveAttack(5 + i, 6);
  expect(newBoard.allGone()).toBe(true);
});
