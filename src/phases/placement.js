import { HUMAN_SQUARES, PLACE_SQUARES, SHIP_NAMES, SHIP_SIZES } from "../const";
import { makeBoard, showShips } from "../board-control";

export function createPlacementArea() {
  let docFrag = document.createDocumentFragment();
  let boardArea = document.createElement("div");
  boardArea.setAttribute("class", "board-area");
  let chooseText = document.createElement("div");
  chooseText.setAttribute("class", "choose-text");
  boardArea.appendChild(chooseText);
  boardArea.appendChild(makeBoard("place"));
  let flipButton = document.createElement("button");
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

export function initializeChooseGrid() {
  document.getElementsByClassName("board")[0].appendChild(chooseGridCreator());
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
  const ships = [
    { name: "Carrier", size: 5 },
    { name: "Battleship", size: 4 },
    { name: "Destroyer", size: 3 },
    { name: "Submarine", size: 3 },
    { name: "Patrol Boat", size: 2 },
  ];
  let placeCount = 0;

  const resetCount = () => {
    placeCount = 0;
  };

  const curName = () => ships[placeCount].name;

  const curSize = () => ships[placeCount].size;

  const nextShip = () => {
    placeCount += 1;
  };

  const isDone = () => (placeCount == ships.length ? true : false);

  const count = () => ships.length;

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
    if (shipPlacer.isDone() == true) {
      delPlacementArea();
    } else {
      showShips(
        document.getElementsByClassName("place"),
        player.board.allShips()
      );
      udpateCurShip(shipPlacer.curName());
    }
  }
}
