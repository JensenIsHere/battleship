import { SHIP_NAMES, SHIP_SIZES } from "../const";
import { makeBoard, showShips } from "../board-control";

export function createPlacementArea() {
  let docFrag = document.createDocumentFragment();
  let boardArea = document.createElement("div"); // Enclosing div for board
  boardArea.setAttribute("class", "board-area");
  let chooseText = document.createElement("div"); // Displays current ship
  chooseText.setAttribute("class", "choose-text");
  boardArea.appendChild(chooseText);
  boardArea.appendChild(makeBoard("place"));
  let flipButton = document.createElement("button"); // Button to flip orient
  flipButton.setAttribute("class", "flip");
  flipButton.textContent = "Horizontal";
  boardArea.appendChild(flipButton);
  docFrag.appendChild(boardArea);
  document.getElementsByClassName("choose-area")[0].appendChild(docFrag);
}

export function initComp(player) {
  // Randomly places ships, repeating in case of a placement failure until done
  let success;
  for (let i = 0; i < SHIP_NAMES.length; i++) {
    do {
      success = player.place(SHIP_NAMES[i], SHIP_SIZES[i]);
    } while ((success = false));
  }
}

export function udpateCurShip(sName) {
  let shipText = document.getElementsByClassName("choose-text")[0];
  shipText.textContent = `Place your ${sName}`;
}

export function switchFlipButton() {
  let button = document.querySelector(".flip");
  button.textContent =
    button.textContent == "Horizontal" ? "Vertical" : "Horizontal";
}

function getOrient() {
  let button = document.querySelector(".flip");
  return button.textContent == "Horizontal" ? "h" : "v";
}

export function delPlacementArea() {
  let placeArea = document.querySelector(".choose-area");
  placeArea.innerHTML = "";
}

export const ShipPlacer = () => {
  let placeCount = 0;

  const resetCount = () => {
    placeCount = 0;
  };
  const curName = () => SHIP_NAMES[placeCount];
  const curSize = () => SHIP_SIZES[placeCount];
  const nextShip = () => {
    placeCount += 1;
  };
  const isDone = () => (placeCount == SHIP_NAMES.length ? true : false);
  const count = () => SHIP_NAMES.length;

  return { resetCount, curName, curSize, nextShip, isDone, count };
};

export function placeTurn(player, shipPlacer, loc) {
  if (
    player.place(
      shipPlacer.curName(),
      shipPlacer.curSize(),
      loc,
      getOrient()
    ) == true
  ) {
    shipPlacer.nextShip();
    if (shipPlacer.isDone() == false) {
      showShips(
        document.getElementsByClassName("place"),
        player.board.allShips()
      );
      udpateCurShip(shipPlacer.curName());
    }
  }
}
