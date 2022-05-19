import { Player } from "./player";

// Game constants
const SHIP_NAMES = [
  "Carrier",
  "Battleship",
  "Destroyer",
  "Submarine",
  "PT Boat",
];
const SHIP_SIZES = [5, 4, 3, 3, 2];
const HUMAN_SQUARES = document.getElementsByClassName("human");
const OPP_SQUARES = document.getElementsByClassName("comp");
const HUMAN_NAME = document.getElementById("p1");
const COMP_NAME = document.getElementById("p2");

function gridCreator(isComp) {
  // Creates the passed player's grid in the DOM
  let docFrag = document.createDocumentFragment();

  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    square.classList = "square empty";
    square.classList.add(isComp == false ? "human" : "comp");
    square.setAttribute("data-loc", i);
    docFrag.appendChild(square);
  }
  return docFrag;
}

function clearBoards() {
  // Removes all hits, misses, and ships displayed on both boards
  for (let i = 0; i < 100; i++) {
    HUMAN_SQUARES[i].className = "square empty human";
    OPP_SQUARES[i].className = "square empty comp";
  }
}

function showHits(squares, shipList, showShips) {
  // Shows both ships and hits on the passed board, option to hide ships
  for (let i = 0; i < shipList.length; i++) {
    if (shipList[i].hit == true) {
      squares[shipList[i].loc].classList.add("hit");
      squares[shipList[i].loc].classList.remove("empty");
    } else if (showShips == true) {
      squares[shipList[i].loc].classList.add("ship-loc");
      squares[shipList[i].loc].classList.remove("empty");
    }
  }
}

function showMisses(squares, missList) {
  // Shows missed shots on the passed board
  for (let i = 0; i < missList.length; i++) {
    squares[missList[i]].classList.add("miss");
    squares[missList[i]].classList.remove("empty");
  }
}

function activateBoard(squares) {
  // Allows a player to interact with the passed board
  for (let i = 0; i < squares.length; i++) squares[i].classList.add("active");
}

function deactivateBoard(squares) {
  // Prevents player from interacting with the passed board
  for (let i = 0; i < squares.length; i++)
    squares[i].classList.remove("active");
}

function refreshBoards(hBoard, cBoard) {
  // Refreshes each board on the screen
  clearBoards(HUMAN_SQUARES, OPP_SQUARES);
  showHits(HUMAN_SQUARES, hBoard.allShips(), true);
  showHits(OPP_SQUARES, cBoard.allShips(), false);
  showMisses(HUMAN_SQUARES, hBoard.misses());
  showMisses(OPP_SQUARES, cBoard.misses());
}

function initializeGrids() {
  // Sets each player's created grid in its designated element
  document.getElementsByClassName("board")[0].appendChild(gridCreator(false));
  document.getElementsByClassName("board")[1].appendChild(gridCreator(true));
}

function initComp(player) {
  // Randomly places ships, repeating in case of a placement failure until done
  let success;
  for (let i = 0; i < SHIP_NAMES.length; i++) {
    do {
      success = player.place(SHIP_NAMES[i], SHIP_SIZES[i]);
    } while ((success = false));
  }
}

function initHuman(player) {
  // Initializes the human player, preset ships until ship placement capability
  // is finished
  let locList = [3, 14, 36, 71, 80];
  let orientList = ["h", "v", "v", "h", "v"];
  for (let i = 0; i < 5; i++)
    player.place(SHIP_NAMES[i], SHIP_SIZES[i], locList[i], orientList[i]);
}

/* Not needed yet
function startPlacement(HUMAN_SQUARES) {
  for (let i = 0; i < 100; i++) HUMAN_SQUARES[i].classList.add("place");
}

function stopPlacement(HUMAN_SQUARES) {
  for (let i = 0; i < 100; i++) HUMAN_SQUARES[i].classList.remove("place");
} */

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

function gameTurn(pro, ant, loc) {
  // Turn controller for regular gameplay
  pro.attack(ant, loc);
  refreshBoards(pro.board, ant.board);
  deactivateBoard(OPP_SQUARES);
  let shipHit = ant.board.shipAtLoc(loc);
  checkSunk(shipHit, ant);
  if (checkWin(pro, ant) == false) {
    setTimeout(() => {
      ant.attack(pro);
      refreshBoards(pro.board, ant.board);
      if (checkWin(ant, pro) == false) activateBoard(OPP_SQUARES);
    }, "500");
  }
}

function hideStart() {
  document.querySelector(".start-area").classList.add("no-disp");
}

function showGame() {
  document.querySelector("main").classList.remove("no-disp");
}

function startGame(pro, ant) {
  // Controller to remove player name entry and start the game
  hideStart();
  showGame();
  initializeGrids();
  changeDisplayNames(pro.name(), ant.name());
  initHuman(pro);
  initComp(ant);
  refreshBoards(pro.board, ant.board);
  activateBoard(OPP_SQUARES);
}

function changeDisplayNames(name1, name2) {
  console.log(`${name1}, ${name2}`);
  let nameFields = document.querySelectorAll(".player-head");
  nameFields[0].innerHTML = name1;
  nameFields[1].innerHTML = name2;
}

var human;
var comp;
var startButton = document.querySelector(".start-game");

startButton.addEventListener("click", function () {
  human = Player(HUMAN_NAME.value, false);
  comp = Player(COMP_NAME.value, true);
  startGame(human, comp);
});

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("active") &&
    e.target.classList.contains("empty")
  )
    gameTurn(human, comp, e.target.dataset.loc);
});
