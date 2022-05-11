const ship = require("../ship");

test("Create a 5-square horizontal carrier at (0, 0) for Player 1", () => {
  expect(ship.Ship(1, "carrier", 5, [0, 0], "h").status()).toEqual({
    player: 1,
    ship: "carrier",
    footprint: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    hits: [0, 0, 0, 0, 0],
    isSunk: false,
  });
});

test("Create a 2-square vertial patrol boat at (4, 6) for Player 2", () => {
  expect(ship.Ship(2, "patrol boat", 2, [4, 6], "v").status()).toEqual({
    player: 2,
    ship: "patrol boat",
    footprint: [
      [4, 6],
      [5, 6],
    ],
    hits: [0, 0],
    isSunk: false,
  });
});

test("Ship won't be created when negative coordinate given", () => {
  expect(ship.Ship(1, "carrier", 5, [-2, 6], "h")).toBe(false);
});

test("Hit function rejects wrong coordinates", () => {
  expect(ship.Ship(2, "patrol boat", 2, [4, 6], "v").hit([4, 4])).toBe(false);
});

test("Hit function registers hits properly", () => {
  expect(ship.Ship(2, "patrol boat", 2, [4, 6], "v").hit([5, 6])).toEqual([
    0,
    [5, 6],
  ]);
});

test("isSunk returns false when ship is healthy", () => {
  let carrier = ship.Ship(1, "carrier", 5, [0, 0], "h");
  expect(carrier.status().isSunk).toBe(false);
});

test("isSunk returns true when all hits registered", () => {
  let carrier = ship.Ship(1, "carrier", 5, [0, 0], "h");
  for (let i = 0; i < 5; i++) carrier.hit([0, i]);
  expect(carrier.status().isSunk).toBe(true);
});

test("isSunk returns false when ship is partially damaged", () => {
  let carrier = ship.Ship(1, "carrier", 5, [0, 0], "h");
  for (let i = 0; i < 4; i++) carrier.hit([0, i]);
  expect(carrier.status().isSunk).toBe(false);
});
