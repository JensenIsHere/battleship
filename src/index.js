import { Player } from "./player";
import {
  SHIP_NAMES,
  SHIP_SIZES,
  HUMAN_SQUARES,
  OPP_SQUARES,
  PLACE_SQUARES,
  HUMAN_NAME,
  OPP_NAME,
} from "./const";
import {
  createPlacementArea,
  initComp,
  initHuman,
  ShipPlacer,
  udpateCurShip,
  switchFlipButton,
  delPlacementArea,
  placeTurn,
} from "./phases/placement";
import { initializeGameGrids, gameTurn } from "./phases/game";
import {
  clearBoard,
  showHits,
  showShips,
  showMisses,
  activateBoard,
} from "./board-control";
import {
  createNameEntry,
  getPlayerNames,
  delNameEntry,
} from "./phases/pregame";

function startGame(pro, ant) {
  // Controller to remove player name entry and start the game
  initializeGameGrids();
  initComp(ant);
  console.log("Comp init done");
  console.log(pro.board.shipList()[0].name());
  showShips(HUMAN_SQUARES, pro.board.allShips());
  activateBoard(OPP_SQUARES);
}

var human;
var comp;
var shipPlacer = ShipPlacer();
//startGame(human, comp);
createNameEntry();

document.addEventListener("click", function (e) {
  let loc = Number(e.target.dataset.loc);
  if (
    e.target.classList.contains("active") &&
    e.target.classList.contains("empty")
  )
    gameTurn(human, comp, loc);
  else if (e.target.classList.contains("place")) {
    placeTurn(human, shipPlacer, loc);
    if (shipPlacer.isDone() == true) {
      delPlacementArea();
      startGame(human, comp);
    }
  } else if (e.target.classList.contains("start-game")) {
    let names = getPlayerNames();
    human = Player(names[0], false);
    comp = Player(names[0], true);
    delNameEntry();
    createPlacementArea();
    udpateCurShip(shipPlacer.curName());
  } else if (e.target.classList.contains("flip")) switchFlipButton();

  /*  else if (e.target.classList.contains("place"))
    placeTurn(e.target.dataset.loc); */
});
