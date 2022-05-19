import { Player } from "./player";

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

function gridCreator(isComp) {
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
  for (let i = 0; i < 100; i++) {
    HUMAN_SQUARES[i].className = "square empty human";
    OPP_SQUARES[i].className = "square empty comp";
  }
}

function showHits(squares, shipList, showShips) {
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
  for (let i = 0; i < missList.length; i++) {
    squares[missList[i]].classList.add("miss");
    squares[missList[i]].classList.remove("empty");
  }
}

function activateBoard(squares) {
  for (let i = 0; i < squares.length; i++) squares[i].classList.add("active");
}

function deactivateBoard(squares) {
  for (let i = 0; i < squares.length; i++)
    squares[i].classList.remove("active");
}

function refreshBoards(hBoard, cBoard) {
  clearBoards(HUMAN_SQUARES, OPP_SQUARES);
  showHits(HUMAN_SQUARES, hBoard.allShips(), true);
  showHits(OPP_SQUARES, cBoard.allShips(), false);
  showMisses(HUMAN_SQUARES, hBoard.misses());
  showMisses(OPP_SQUARES, cBoard.misses());
}

function initializeGrids() {
  document.getElementsByClassName("board")[0].appendChild(gridCreator(false));
  document.getElementsByClassName("board")[1].appendChild(gridCreator(true));
}

function initComp(player) {
  let success;
  for (let i = 0; i < SHIP_NAMES.length; i++) {
    do {
      success = player.place(SHIP_NAMES[i], SHIP_SIZES[i]);
    } while ((success = false));
  }
}

function initHuman(player) {
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

function gameStart() {
  initializeGrids();
  initHuman(human);
  initComp(comp);
  refreshBoards(human.board, comp.board);
  deactivateBoard(HUMAN_SQUARES);
  activateBoard(OPP_SQUARES);
}

function checkSunk(loc, player) {
  if (loc > -1 && player.board.shipList()[loc].isSunk() == true) {
    console.log(
      `You sunk ${player.name()}'s ${player.board.shipList()[loc].name()}!`
    );
  }
}

function checkWin(pro, ant) {
  if (ant.board.allSunk() == true) {
    alert(`${pro.name()} wins!`);
    return true;
  } else return false;
}

function gameTurn(pro, ant, loc) {
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

var human = Player("Human", false);
var comp = Player("Computer", true);
gameStart();

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("active") &&
    e.target.classList.contains("empty")
  )
    gameTurn(human, comp, e.target.dataset.loc);
});
