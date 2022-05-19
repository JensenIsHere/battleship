import { Player } from "../src/player";

test("Initializes player properly", () => {
  let newb = Player("Jensen", false);
  expect(newb.name()).toBe("Jensen");
});

test("Computer player performs a random move", () => {
  let comp = Player("Computer", true);
  let player = Player("Man", false);
  expect(comp.attack(player)).not.toBe(-1);
});

test("Human player attacks other player's board", () => {
  let comp = Player("Computer", true);
  let player = Player("Man", false);
  comp.board.placeShip("Carrier", 5, 41, "v");
  expect(player.attack(comp, 81)).toBe(true);
});

test("Human player cannot do random moves", () => {
  let comp = Player("Computer", true);
  let player = Player("Man", false);
  expect(player.attack(comp)).toBe(false);
});
