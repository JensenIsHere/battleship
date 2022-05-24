import { Gameboard } from "./gameboard";

export const Player = (pName, type) => {
  let playerName = pName;
  let playerType = type;
  let board = Gameboard();

  const name = () => playerName;

  const isComp = () => playerType;

  const attack = (player, loc) => {
    if (playerType == false) {
      // Human-only
      return player.board.receiveAttack(loc);
    }
    // Computer-only
    let success;
    do {
      success = player.board.receiveAttack(Math.floor(Math.random() * 100));
    } while (success == -1);
    return success;
  };

  const place = (name, size, loc, orient) => {
    if (playerType == false)
      // Human-only
      return board.placeShip(name, size, loc, orient);
    // Computer-only
    let rLoc;
    let rOrient;
    do {
      rLoc = Math.floor(Math.random() * 100);
      rOrient = Math.floor(Math.random() * 2) == 0 ? "h" : "v";
    } while (board.placeShip(name, size, rLoc, rOrient) == false);
    return rLoc;
  };

  return { name, isComp, board, attack, place };
};
