import { Ship } from "../src/ship";

test("Ship objects initialize correctly", function () {
  let newShip = Ship("carrier", 5);
  expect(newShip.name()).toBe("carrier");
  expect(newShip.size()).toBe(5);
  expect(newShip.isSunk()).toBe(false);
});

test("Ship objects register hits properly and sinks", function () {
  let newShip = Ship("carrier", 5);
  expect(newShip.isSunk()).toBe(false);
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  expect(newShip.isSunk()).toBe(false);
  newShip.hit(4);
  expect(newShip.isSunk()).toBe(true);
});

test("Ship object hit method rejects bad values", function () {
  let newShip = Ship("carrier", 5);
  expect(newShip.hit(-1)).toBe(false);
  expect(newShip.hit(5)).toBe(false);
  expect(newShip.hit("blargh")).toBe(false);
  expect(newShip.hit(true)).toBe(false);
});
