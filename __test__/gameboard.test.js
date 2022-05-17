import { Gameboard } from "../src/gameboard";

test("Gameboard creates a ship properly", function () {
  let board = Gameboard();
  board.placeShip("carrier", 5, 32, "h");
  expect(board.shipList()[0].name()).toBe("carrier");
});

test("Gameboard stores ship locations correctly", function () {
  let board = Gameboard();
  board.placeShip("PT Boat 1", 2, 21, "h");
  board.placeShip("PT Boat 2", 2, 56, "v");
  let ships = board.allShips();
  expect(ships).toEqual([
    { ship: 0, loc: 21, sector: 0, hit: false },
    { ship: 0, loc: 22, sector: 1, hit: false },
    { ship: 1, loc: 56, sector: 0, hit: false },
    { ship: 1, loc: 66, sector: 1, hit: false },
  ]);
});

test("Gameboard won't allow overlapping ships", () => {
  let board = Gameboard();
  board.placeShip("PT Boat 1", 2, 21, "h");
  expect(board.placeShip("PT Boat 2", 2, 22, "v")).toBe(false);
});

test("receiveAttack misses and board registers the miss", () => {
  let board = Gameboard();
  board.receiveAttack(91);
  expect(board.misses()[0]).toBe(91);
});

test("receiveAttack hits and sinks a ship", () => {
  let board = Gameboard();
  board.placeShip("PT Boat 1", 2, 90, "h");
  board.receiveAttack(91);
  board.receiveAttack(90);
  expect(board.allShips()[1].hit).toBe(true);
  expect(board.allShips()[0].hit).toBe(true);
  expect(board.shipList()[0].isSunk()).toBe(true);
});

test("allSunk reports false when ships are still alive", () => {
  let board = Gameboard();
  board.placeShip("PT Boat 1", 2, 90, "h");
  board.receiveAttack(90);
  expect(board.allSunk()).toBe(false);
});

test("allSunk reports true when all ships are sunk", () => {
  let board = Gameboard();
  board.placeShip("PT Boat 1", 2, 90, "h");
  board.placeShip("PT Boat 2", 2, 56, "v");
  board.receiveAttack(90);
  board.receiveAttack(91);
  board.receiveAttack(56);
  board.receiveAttack(66);
  expect(board.allSunk()).toBe(true);
});
