const ship = require("./ship");

const Gameboard = () => {
  let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let ships = [];

  const boardState = () => board;

  const shipState = () => ships;

  const placeShip = (name, size, coord, orient) => {
    let newShip = ship.Ship(name, size, coord, orient);
    if (orient == "h") {
      for (let i = 0; i < size; i++)
        if (board[coord[0]][coord[1] + i] == 1 || coord[1] + i > 9)
          return false;
      for (let i = 0; i < size; i++) board[coord[0]][coord[1] + i] = 1;
    } else {
      for (let i = 0; i < size; i++)
        if (board[coord[0] + i][coord[1]] == 1 || coord[0] + i > 9)
          return false;
      for (let i = 0; i < size; i++) board[coord[0] + i][coord[1]] = 1;
    }
    ships.push(newShip);
    return true;
  };

  const receiveAttack = (row, col) => {
    if (board[row][col] == 1) {
      let targetShip = findShip(row, col);
      ships[targetShip].hit(row, col);
      board[row][col] = -1;
      return 1;
    } else if (board[row][col] == -1) return -1;
    board[row][col] = -1;
    return 0;
  };

  const findShip = (row, col) => {
    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].loc().length; j++) {
        if (ships[i].loc()[j][0] == row && ships[i].loc()[j][1] == col)
          return i;
      }
    }
  };

  const allGone = () => {
    for (let i = 0; i < ships.length; i++)
      if (ships[i].sunk() == false) return false;
    return true;
  };

  return { boardState, shipState, placeShip, receiveAttack, allGone };
};

module.exports = { Gameboard: Gameboard };
