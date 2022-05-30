import { Player } from "./player";
import {
  createPlacementArea,
  initComp,
  ShipPlacer,
  udpateCurShip,
  switchFlipButton,
  delPlacementArea,
  placeTurn,
} from "./phases/placement";
import { gameTurn, startGame, resetGame } from "./phases/game";
import {
  createNameEntry,
  getPlayerNames,
  delNameEntry,
} from "./phases/pregame";

var human;
var comp;
var shipPlacer = ShipPlacer();
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
      shipPlacer.resetCount();
      delPlacementArea();
      initComp(comp);
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
  else if (e.target.classList.contains("reset")) resetGame();
});
