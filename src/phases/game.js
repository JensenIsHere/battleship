import { HUMAN_SQUARES, OPP_SQUARES } from "../const";
import {
  makeBoard,
  clearBoard,
  showHits,
  showShips,
  showMisses,
  activateBoard,
  deactivateBoard,
} from "../board-control";

export function initializeGameGrids() {}

function checkSunk(loc, player) {
  // Checks if a ship was completely sunk and displays a message if true
  if (loc > -1 && player.board.shipList()[loc].isSunk() == true) {
    console.log(
      `You sunk ${player.name()}'s ${player.board.shipList()[loc].name()}!`
    );
  }
}

function checkWin(pro, ant) {
  // Checks if the first passed player won against the second
  if (ant.board.allSunk() == true) {
    alert(`${pro.name()} wins!`);
    return true;
  } else return false;
}

export function gameTurn(pro, ant, loc) {
  // Turn controller for regular gameplay
  pro.attack(ant, loc);
  clearBoard(OPP_SQUARES, "comp");
  showHits(OPP_SQUARES, ant.board.allShips());
  showMisses(OPP_SQUARES, ant.board.misses());
  deactivateBoard(OPP_SQUARES);
  let shipHit = ant.board.shipAtLoc(loc);
  checkSunk(shipHit, ant);
  if (checkWin(pro, ant) == false) {
    setTimeout(() => {
      ant.attack(pro);
      clearBoard(HUMAN_SQUARES, "human");
      showMisses(HUMAN_SQUARES, pro.board.misses());
      showShips(HUMAN_SQUARES, pro.board.allShips());
      showHits(HUMAN_SQUARES, pro.board.allShips());
      if (checkWin(ant, pro) == false) activateBoard(OPP_SQUARES);
    }, "500");
  }
}
