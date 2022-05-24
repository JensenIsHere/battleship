import { Player } from "./player";
import { HUMAN_SQUARES, OPP_SQUARES } from "./const";
import {
  createPlacementArea,
  initComp,
  ShipPlacer,
  udpateCurShip,
  switchFlipButton,
  delPlacementArea,
  placeTurn,
} from "./phases/placement";
import { createGameArea, gameTurn, setBoardNames } from "./phases/game";
import { showShips, activateBoard } from "./board-control";
import {
  createNameEntry,
  getPlayerNames,
  delNameEntry,
} from "./phases/pregame";

function startGame(pro, ant) {
  // Controller to remove player name entry and start the game
  document.querySelector("main").appendChild(createGameArea());
  initComp(ant);
  showShips(HUMAN_SQUARES, pro.board.allShips());
  setBoardNames(human.name(), comp.name());
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
    comp = Player(names[1], true);
    delNameEntry();
    createPlacementArea();
    udpateCurShip(shipPlacer.curName());
  } else if (e.target.classList.contains("flip")) switchFlipButton();
});
