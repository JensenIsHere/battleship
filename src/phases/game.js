import { HUMAN_SQUARES, OPP_SQUARES, SHIP_NAMES } from "../const";
import {
  makeBoard,
  clearBoard,
  showHits,
  showShips,
  showMisses,
  activateBoard,
  deactivateBoard,
} from "../board-control";

export function createGameArea() {
  let docFrag = document.createDocumentFragment();
  docFrag.appendChild(createAnnounceArea());
  docFrag.appendChild(createPlayerArea("human"));
  docFrag.appendChild(createPlayerArea("comp"));

  return docFrag;
}

function createAnnounceArea() {
  let announceArea = document.createElement("div");
  announceArea.setAttribute("class", "announce");
  return announceArea;
}

function createPlayerArea(type) {
  let playerArea = document.createElement("div");
  playerArea.setAttribute("class", "board-area");
  let playerHead = document.createElement("div");
  playerHead.setAttribute("class", "player-head");
  playerArea.appendChild(playerHead);
  playerArea.appendChild(makeBoard(type));
  playerArea.appendChild(createShipList(type));

  return playerArea;
}

function createShipList(type) {
  let listContainer = document.createElement("div");
  listContainer.setAttribute("class", "ship-list");
  for (let i = 0; i < SHIP_NAMES.length; i++) {
    let shipDisplay = document.createElement("div");
    shipDisplay.classList = `ship-alive ${type}`;
    shipDisplay.setAttribute("data-i", i);
    shipDisplay.textContent = SHIP_NAMES[i];
    listContainer.appendChild(shipDisplay);
  }
  return listContainer;
}

export function setBoardNames(name1, name2) {
  document.querySelectorAll(".player-head")[0].textContent = name1;
  document.querySelectorAll(".player-head")[1].textContent = name2;
}

export function startGame(pro, ant) {
  // Controller to remove player name entry and start the game
  document.querySelector("main").appendChild(createGameArea());
  showShips(HUMAN_SQUARES, pro.board.allShips());
  setBoardNames(pro.name(), ant.name());
  activateBoard(OPP_SQUARES);
}

function checkSunk(index, player) {
  // Checks if a ship was completely sunk and displays a message if true
  let hitShip = player.board.shipList()[index];
  if (index > -1 && hitShip.isSunk() == true) {
    console.log(`You sunk ${player.name()}'s ${hitShip.name()}!`);
    let type = player.isComp() == false ? "human" : "comp";
    let shipRoster = document.querySelectorAll(`.ship-alive.${type}`);
    for (let i = 0; i < shipRoster.length; i++) {
      if (shipRoster[i].dataset.i == index) {
        shipRoster[i].classList = `ship-dead ${type}`;
        break;
      }
    }
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
