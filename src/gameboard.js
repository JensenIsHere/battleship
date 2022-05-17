import { Ship } from "./ship";

export const Gameboard = () => {
  let missList = [];
  let ships = [];
  let shipLoc = [];

  const shipList = () => ships;

  const misses = () => missList;

  const allShips = () => shipLoc;

  const placeShip = (sName, size, loc, orient) => {
    let spaceNeeded = new Array(0);
    for (let i = 0; i < size; i++) {
      spaceNeeded.push(loc + (orient == "h" ? i : i * 10));
    }
    for (let i = 0; i < shipLoc.length; i++) {
      if (spaceNeeded.indexOf(shipLoc[i].loc) != -1) return false;
    }
    ships.push(Ship(sName, size));
    for (let i = 0; i < size; i++) {
      shipLoc.push({
        ship: ships.length - 1,
        loc: spaceNeeded[i],
        sector: i,
        hit: false,
      });
    }
    return true;
  };

  const receiveAttack = (loc) => {
    for (let i = 0; i < shipLoc.length; i++) {
      if (shipLoc[i].loc == loc) {
        ships[shipLoc[i].ship].hit(shipLoc[i].sector);
        shipLoc[i].hit = true;
        return true;
      }
    }
    missList.push(loc);
    return false;
  };

  const allSunk = () => {
    for (let i = 0; i < shipLoc.length; i++) {
      if (shipLoc[i].hit == false) return false;
    }
    return true;
  };

  return {
    shipList,
    misses,
    allShips,
    placeShip,
    receiveAttack,
    allSunk,
  };
};
