const ship = require("../src/ship");

test("Create a 5-square horizontal carrier at (0, 0) for Player 1", () => {
  expect(ship.Ship("carrier", 5, [0, 0], "h").loc()).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("Create a 2-square vertial ship at (4, 6)", () => {
  expect(ship.Ship("patrol boat", 2, [4, 6], "v").loc()).toEqual([
    [4, 6],
    [5, 6],
  ]);
});

test("Ship won't be created when negative coordinate given", () => {
  expect(ship.Ship("carrier", 5, [-2, 6], "h")).toBe(false);
});

test("Hit function rejects wrong coordinates", () => {
  expect(ship.Ship("patrol boat", 2, [4, 6], "v").hit([4, 4])).toBe(false);
});

test("Hit function registers hits properly", () => {
  expect(ship.Ship("patrol boat", 2, [4, 6], "v").hit(5, 6)).toEqual([
    0,
    [5, 6],
  ]);
});

test("isSunk returns false when ship is healthy", () => {
  let carrier = ship.Ship("carrier", 5, [0, 0], "h");
  expect(carrier.sunk()).toBe(false);
});

test("isSunk returns true when all hits registered", () => {
  let carrier = ship.Ship("carrier", 5, [0, 0], "h");
  for (let i = 0; i < 5; i++) carrier.hit(0, i);
  expect(carrier.sunk()).toBe(true);
});

test("isSunk returns false when ship is partially damaged", () => {
  let carrier = ship.Ship("carrier", 5, [0, 0], "h");
  for (let i = 0; i < 4; i++) carrier.hit(0, i);
  expect(carrier.sunk()).toBe(false);
});
