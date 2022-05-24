import { Ship } from "./ship";

export const Gameboard = () => {
  let missList = [];
  let ships = [];
  let shipLoc = [];

  const shipList = () => ships;

  const misses = () => missList;

  const allShips = () => shipLoc;

  const shipAtLoc = (loc) => {
    // Gives index of the ship at a loc
    for (let i = 0; i < shipLoc.length; i++) {
      if (shipLoc[i].loc == loc) return shipLoc[i].ship;
    }
    return -1;
  };

  const placeShip = (sName, size, loc, orient) => {
    // Checks if ship will wrap horizontally
    if ((loc % 10) + size - 1 > 9 && orient == "h") return false;
    let spaceNeeded = [];
    // Predicts where all ship sections will be located
    for (let i = 0; i < size; i++) {
      spaceNeeded.push(loc + (orient == "h" ? i : i * 10));
      //Checks if all predicted ship sections fit on board
      if (spaceNeeded.at(-1) >= 100) return false;
    }
    for (let i = 0; i < shipLoc.length; i++) {
      //Checks if another ship will be in the way
      if (spaceNeeded.indexOf(shipLoc[i].loc) != -1) return false;
    }
    ships.push(Ship(sName, size));
    for (let i = 0; i < size; i++) {
      // Enters all ship loc's in the array
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
    if (loc > 99 || loc < 0) return -1; // Attacks outside of the board fail
    for (let i = 0; i < shipLoc.length; i++) {
      //Check to see if attack hit a ship and registers a hit on that section
      if (shipLoc[i].loc == loc) {
        if (shipLoc[i].hit == true) return -1;
        ships[shipLoc[i].ship].hit(shipLoc[i].sector);
        shipLoc[i].hit = true;
        return true;
      }
    }
    // Checks if attack already missed at loc
    if (missList.indexOf(loc) != -1) return -1;
    missList.push(loc);
    return false;
  };

  const allSunk = () => {
    // Checks if all ship sections are hit
    for (let i = 0; i < shipLoc.length; i++) {
      if (shipLoc[i].hit == false) return false;
    }
    return true;
  };

  return {
    shipList,
    misses,
    allShips,
    shipAtLoc,
    placeShip,
    receiveAttack,
    allSunk,
  };
};
