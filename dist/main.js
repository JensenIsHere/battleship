/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board-control.js":
/*!******************************!*\
  !*** ./src/board-control.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"activateBoard\": () => (/* binding */ activateBoard),\n/* harmony export */   \"changeDisplayNames\": () => (/* binding */ changeDisplayNames),\n/* harmony export */   \"clearBoard\": () => (/* binding */ clearBoard),\n/* harmony export */   \"deactivateBoard\": () => (/* binding */ deactivateBoard),\n/* harmony export */   \"makeBoard\": () => (/* binding */ makeBoard),\n/* harmony export */   \"showHits\": () => (/* binding */ showHits),\n/* harmony export */   \"showMisses\": () => (/* binding */ showMisses),\n/* harmony export */   \"showShips\": () => (/* binding */ showShips)\n/* harmony export */ });\nfunction makeBoard(type) {\n  let newBoard = document.createElement(\"div\");\n  newBoard.setAttribute(\"class\", \"board\");\n  for (let i = 0; i < 100; i++) {\n    let newSquare = document.createElement(\"div\");\n    newSquare.classList = `square empty ${type}`;\n    newSquare.setAttribute(\"data-loc\", i);\n    newBoard.appendChild(newSquare);\n  }\n  return newBoard;\n}\n\nfunction clearBoard(squares, type) {\n  // Removes all hits, misses, and ships displayed\n  for (let i = 0; i < 100; i++) {\n    squares[i].className = `square empty ${type}`;\n  }\n}\n\nfunction showHits(squares, allShips) {\n  // Shows hits on the passed board squares\n  for (let i = 0; i < allShips.length; i++) {\n    if (allShips[i].hit == true) {\n      squares[allShips[i].loc].classList.add(\"hit\");\n      squares[allShips[i].loc].classList.remove(\"empty\");\n      squares[allShips[i].loc].classList.remove(\"ship-loc\");\n    }\n  }\n}\n\nfunction showShips(squares, allShips) {\n  // Shows ships on the passed board squares\n  for (let i = 0; i < allShips.length; i++) {\n    squares[allShips[i].loc].classList.add(\"ship-loc\");\n    squares[allShips[i].loc].classList.remove(\"empty\");\n  }\n}\n\nfunction showMisses(squares, misses) {\n  // Shows missed shots on the passed board\n  for (let i = 0; i < misses.length; i++) {\n    squares[misses[i]].classList.add(\"miss\");\n    squares[misses[i]].classList.remove(\"empty\");\n  }\n}\n\nfunction activateBoard(squares) {\n  // Allows a player to interact with the passed board\n  for (let i = 0; i < squares.length; i++) squares[i].classList.add(\"active\");\n}\n\nfunction deactivateBoard(squares) {\n  // Prevents player from interacting with the passed board\n  for (let i = 0; i < squares.length; i++)\n    squares[i].classList.remove(\"active\");\n}\n\nfunction changeDisplayNames(name1, name2) {\n  console.log(`${name1}, ${name2}`);\n  let nameFields = document.querySelectorAll(\".player-head\");\n  nameFields[0].innerHTML = name1;\n  nameFields[1].innerHTML = name2;\n}\n\n\n//# sourceURL=webpack://battleship/./src/board-control.js?");

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HUMAN_NAME\": () => (/* binding */ HUMAN_NAME),\n/* harmony export */   \"HUMAN_SQUARES\": () => (/* binding */ HUMAN_SQUARES),\n/* harmony export */   \"OPP_NAME\": () => (/* binding */ OPP_NAME),\n/* harmony export */   \"OPP_SQUARES\": () => (/* binding */ OPP_SQUARES),\n/* harmony export */   \"PLACE_SQUARES\": () => (/* binding */ PLACE_SQUARES),\n/* harmony export */   \"SHIP_NAMES\": () => (/* binding */ SHIP_NAMES),\n/* harmony export */   \"SHIP_SIZES\": () => (/* binding */ SHIP_SIZES)\n/* harmony export */ });\n// Game constants\nconst SHIP_NAMES = [\n  \"Carrier\",\n  \"Battleship\",\n  \"Destroyer\",\n  \"Submarine\",\n  \"PT Boat\",\n];\nconst SHIP_SIZES = [5, 4, 3, 3, 2];\nconst HUMAN_SQUARES = document.getElementsByClassName(\"human\");\nconst OPP_SQUARES = document.getElementsByClassName(\"comp\");\nconst PLACE_SQUARES = document.getElementsByClassName(\"place\");\nconst HUMAN_NAME = document.getElementById(\"p1\");\nconst OPP_NAME = document.getElementById(\"p2\");\n\n\n//# sourceURL=webpack://battleship/./src/const.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Gameboard\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst Gameboard = () => {\n  let missList = [];\n  let ships = [];\n  let shipLoc = [];\n\n  const shipList = () => ships;\n\n  const misses = () => missList;\n\n  const allShips = () => shipLoc;\n\n  const shipAtLoc = (loc) => {\n    for (let i = 0; i < shipLoc.length; i++) {\n      if (shipLoc[i].loc == loc) return shipLoc[i].ship;\n    }\n    return -1;\n  };\n\n  const placeShip = (sName, size, loc, orient) => {\n    // Checks if ship will wrap horizontally\n    if ((loc % 10) + size - 1 > 9 && orient == \"h\") return false;\n    let spaceNeeded = [];\n    for (let i = 0; i < size; i++) {\n      spaceNeeded.push(loc + (orient == \"h\" ? i : i * 10));\n      //Checks if the ship fits on board\n      if (spaceNeeded.at(-1) >= 100) return false;\n    }\n    for (let i = 0; i < shipLoc.length; i++) {\n      //Checks if another ship is in the way\n      if (spaceNeeded.indexOf(shipLoc[i].loc) != -1) return false;\n    }\n    ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(sName, size));\n    for (let i = 0; i < size; i++) {\n      shipLoc.push({\n        ship: ships.length - 1,\n        loc: spaceNeeded[i],\n        sector: i,\n        hit: false,\n      });\n    }\n    return true;\n  };\n\n  const receiveAttack = (loc) => {\n    if (loc > 99 || loc < 0) return -1;\n    for (let i = 0; i < shipLoc.length; i++) {\n      //Check to see if it hit anything\n      if (shipLoc[i].loc == loc) {\n        if (shipLoc[i].hit == true) return -1;\n        ships[shipLoc[i].ship].hit(shipLoc[i].sector);\n        shipLoc[i].hit = true;\n        return true;\n      }\n    }\n    if (missList.indexOf(loc) != -1) return -1;\n    missList.push(loc);\n    return false;\n  };\n\n  const allSunk = () => {\n    for (let i = 0; i < shipLoc.length; i++) {\n      if (shipLoc[i].hit == false) return false;\n    }\n    return true;\n  };\n\n  return {\n    shipList,\n    misses,\n    allShips,\n    shipAtLoc,\n    placeShip,\n    receiveAttack,\n    allSunk,\n  };\n};\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const */ \"./src/const.js\");\n/* harmony import */ var _phases_placement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./phases/placement */ \"./src/phases/placement.js\");\n/* harmony import */ var _phases_game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./phases/game */ \"./src/phases/game.js\");\n/* harmony import */ var _board_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./board-control */ \"./src/board-control.js\");\n/* harmony import */ var _phases_pregame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./phases/pregame */ \"./src/phases/pregame.js\");\n\n\n\n\n\n\n\nfunction startGame(pro, ant) {\n  // Controller to remove player name entry and start the game\n  document.querySelector(\"main\").appendChild((0,_phases_game__WEBPACK_IMPORTED_MODULE_3__.createGameArea)());\n  (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.initComp)(ant);\n  (0,_board_control__WEBPACK_IMPORTED_MODULE_4__.showShips)(_const__WEBPACK_IMPORTED_MODULE_1__.HUMAN_SQUARES, pro.board.allShips());\n  (0,_phases_game__WEBPACK_IMPORTED_MODULE_3__.setBoardNames)(human.name(), comp.name());\n  (0,_board_control__WEBPACK_IMPORTED_MODULE_4__.activateBoard)(_const__WEBPACK_IMPORTED_MODULE_1__.OPP_SQUARES);\n}\n\nvar human;\nvar comp;\nvar shipPlacer = (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.ShipPlacer)();\n//startGame(human, comp);\n(0,_phases_pregame__WEBPACK_IMPORTED_MODULE_5__.createNameEntry)();\n\ndocument.addEventListener(\"click\", function (e) {\n  let loc = Number(e.target.dataset.loc);\n  if (\n    e.target.classList.contains(\"active\") &&\n    e.target.classList.contains(\"empty\")\n  )\n    (0,_phases_game__WEBPACK_IMPORTED_MODULE_3__.gameTurn)(human, comp, loc);\n  else if (e.target.classList.contains(\"place\")) {\n    (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.placeTurn)(human, shipPlacer, loc);\n    if (shipPlacer.isDone() == true) {\n      (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.delPlacementArea)();\n      startGame(human, comp);\n    }\n  } else if (e.target.classList.contains(\"start-game\")) {\n    let names = (0,_phases_pregame__WEBPACK_IMPORTED_MODULE_5__.getPlayerNames)();\n    human = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)(names[0], false);\n    comp = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)(names[1], true);\n    (0,_phases_pregame__WEBPACK_IMPORTED_MODULE_5__.delNameEntry)();\n    (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.createPlacementArea)();\n    (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.udpateCurShip)(shipPlacer.curName());\n  } else if (e.target.classList.contains(\"flip\")) (0,_phases_placement__WEBPACK_IMPORTED_MODULE_2__.switchFlipButton)();\n});\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/phases/game.js":
/*!****************************!*\
  !*** ./src/phases/game.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createGameArea\": () => (/* binding */ createGameArea),\n/* harmony export */   \"gameTurn\": () => (/* binding */ gameTurn),\n/* harmony export */   \"setBoardNames\": () => (/* binding */ setBoardNames)\n/* harmony export */ });\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n/* harmony import */ var _board_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../board-control */ \"./src/board-control.js\");\n\n\n\nfunction createGameArea() {\n  let docFrag = document.createDocumentFragment();\n  docFrag.appendChild(createAnnounceArea());\n  docFrag.appendChild(createPlayerArea(\"human\"));\n  docFrag.appendChild(createPlayerArea(\"comp\"));\n\n  return docFrag;\n}\n\nfunction createAnnounceArea() {\n  let announceArea = document.createElement(\"div\");\n  announceArea.setAttribute(\"class\", \"announce\");\n  return announceArea;\n}\n\nfunction createPlayerArea(type) {\n  let playerArea = document.createElement(\"div\");\n  playerArea.setAttribute(\"class\", \"board-area\");\n  let playerHead = document.createElement(\"div\");\n  playerHead.setAttribute(\"class\", \"player-head\");\n  playerArea.appendChild(playerHead);\n  playerArea.appendChild((0,_board_control__WEBPACK_IMPORTED_MODULE_1__.makeBoard)(type));\n\n  return playerArea;\n}\n\nfunction setBoardNames(name1, name2) {\n  document.querySelectorAll(\".player-head\")[0].textContent = name1;\n  document.querySelectorAll(\".player-head\")[1].textContent = name2;\n}\n\nfunction checkSunk(loc, player) {\n  // Checks if a ship was completely sunk and displays a message if true\n  if (loc > -1 && player.board.shipList()[loc].isSunk() == true) {\n    console.log(\n      `You sunk ${player.name()}'s ${player.board.shipList()[loc].name()}!`\n    );\n  }\n}\n\nfunction checkWin(pro, ant) {\n  // Checks if the first passed player won against the second\n  if (ant.board.allSunk() == true) {\n    alert(`${pro.name()} wins!`);\n    return true;\n  } else return false;\n}\n\nfunction gameTurn(pro, ant, loc) {\n  // Turn controller for regular gameplay\n  pro.attack(ant, loc);\n  (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.clearBoard)(_const__WEBPACK_IMPORTED_MODULE_0__.OPP_SQUARES, \"comp\");\n  (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.showHits)(_const__WEBPACK_IMPORTED_MODULE_0__.OPP_SQUARES, ant.board.allShips());\n  (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.showMisses)(_const__WEBPACK_IMPORTED_MODULE_0__.OPP_SQUARES, ant.board.misses());\n  (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.deactivateBoard)(_const__WEBPACK_IMPORTED_MODULE_0__.OPP_SQUARES);\n  let shipHit = ant.board.shipAtLoc(loc);\n  checkSunk(shipHit, ant);\n  if (checkWin(pro, ant) == false) {\n    setTimeout(() => {\n      ant.attack(pro);\n      (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.clearBoard)(_const__WEBPACK_IMPORTED_MODULE_0__.HUMAN_SQUARES, \"human\");\n      (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.showMisses)(_const__WEBPACK_IMPORTED_MODULE_0__.HUMAN_SQUARES, pro.board.misses());\n      (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.showShips)(_const__WEBPACK_IMPORTED_MODULE_0__.HUMAN_SQUARES, pro.board.allShips());\n      (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.showHits)(_const__WEBPACK_IMPORTED_MODULE_0__.HUMAN_SQUARES, pro.board.allShips());\n      if (checkWin(ant, pro) == false) (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.activateBoard)(_const__WEBPACK_IMPORTED_MODULE_0__.OPP_SQUARES);\n    }, \"500\");\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/phases/game.js?");

/***/ }),

/***/ "./src/phases/placement.js":
/*!*********************************!*\
  !*** ./src/phases/placement.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShipPlacer\": () => (/* binding */ ShipPlacer),\n/* harmony export */   \"createPlacementArea\": () => (/* binding */ createPlacementArea),\n/* harmony export */   \"delPlacementArea\": () => (/* binding */ delPlacementArea),\n/* harmony export */   \"initComp\": () => (/* binding */ initComp),\n/* harmony export */   \"placeTurn\": () => (/* binding */ placeTurn),\n/* harmony export */   \"switchFlipButton\": () => (/* binding */ switchFlipButton),\n/* harmony export */   \"udpateCurShip\": () => (/* binding */ udpateCurShip)\n/* harmony export */ });\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n/* harmony import */ var _board_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../board-control */ \"./src/board-control.js\");\n\n\n\nfunction createPlacementArea() {\n  let docFrag = document.createDocumentFragment();\n  let boardArea = document.createElement(\"div\"); // Enclosing div for board\n  boardArea.setAttribute(\"class\", \"board-area\");\n  let chooseText = document.createElement(\"div\"); // Displays current ship\n  chooseText.setAttribute(\"class\", \"choose-text\");\n  boardArea.appendChild(chooseText);\n  boardArea.appendChild((0,_board_control__WEBPACK_IMPORTED_MODULE_1__.makeBoard)(\"place\"));\n  let flipButton = document.createElement(\"button\"); // Button to flip orient\n  flipButton.setAttribute(\"class\", \"flip\");\n  flipButton.textContent = \"Horizontal\";\n  boardArea.appendChild(flipButton);\n  docFrag.appendChild(boardArea);\n  document.getElementsByClassName(\"choose-area\")[0].appendChild(docFrag);\n}\n\nfunction initComp(player) {\n  // Randomly places ships, repeating in case of a placement failure until done\n  let success;\n  for (let i = 0; i < _const__WEBPACK_IMPORTED_MODULE_0__.SHIP_NAMES.length; i++) {\n    do {\n      success = player.place(_const__WEBPACK_IMPORTED_MODULE_0__.SHIP_NAMES[i], _const__WEBPACK_IMPORTED_MODULE_0__.SHIP_SIZES[i]);\n    } while ((success = false));\n  }\n}\n\nfunction udpateCurShip(sName) {\n  let shipText = document.getElementsByClassName(\"choose-text\")[0];\n  shipText.textContent = `Place your ${sName}`;\n}\n\nfunction switchFlipButton() {\n  let button = document.querySelector(\".flip\");\n  button.textContent =\n    button.textContent == \"Horizontal\" ? \"Vertical\" : \"Horizontal\";\n}\n\nfunction getOrient() {\n  let button = document.querySelector(\".flip\");\n  return button.textContent == \"Horizontal\" ? \"h\" : \"v\";\n}\n\nfunction delPlacementArea() {\n  let placeArea = document.querySelector(\".choose-area\");\n  placeArea.innerHTML = \"\";\n}\n\nconst ShipPlacer = () => {\n  let placeCount = 0;\n\n  const resetCount = () => {\n    placeCount = 0;\n  };\n  const curName = () => _const__WEBPACK_IMPORTED_MODULE_0__.SHIP_NAMES[placeCount];\n  const curSize = () => _const__WEBPACK_IMPORTED_MODULE_0__.SHIP_SIZES[placeCount];\n  const nextShip = () => {\n    placeCount += 1;\n  };\n  const isDone = () => (placeCount == _const__WEBPACK_IMPORTED_MODULE_0__.SHIP_NAMES.length ? true : false);\n  const count = () => _const__WEBPACK_IMPORTED_MODULE_0__.SHIP_NAMES.length;\n\n  return { resetCount, curName, curSize, nextShip, isDone, count };\n};\n\nfunction placeTurn(player, shipPlacer, loc) {\n  if (\n    player.place(\n      shipPlacer.curName(),\n      shipPlacer.curSize(),\n      loc,\n      getOrient()\n    ) == true\n  ) {\n    shipPlacer.nextShip();\n    if (shipPlacer.isDone() == false) {\n      (0,_board_control__WEBPACK_IMPORTED_MODULE_1__.showShips)(\n        document.getElementsByClassName(\"place\"),\n        player.board.allShips()\n      );\n      udpateCurShip(shipPlacer.curName());\n    }\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/phases/placement.js?");

/***/ }),

/***/ "./src/phases/pregame.js":
/*!*******************************!*\
  !*** ./src/phases/pregame.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createNameEntry\": () => (/* binding */ createNameEntry),\n/* harmony export */   \"delNameEntry\": () => (/* binding */ delNameEntry),\n/* harmony export */   \"getPlayerNames\": () => (/* binding */ getPlayerNames)\n/* harmony export */ });\nfunction createNameEntry() {\n  let docFrag = document.createDocumentFragment();\n  docFrag.appendChild(createPlayerTextBox(\"1\", \"Player\"));\n  docFrag.appendChild(createPlayerTextBox(\"2\", \"Computer\"));\n  docFrag.appendChild(createStartButton());\n  document.getElementsByClassName(\"start-area\")[0].appendChild(docFrag);\n}\n\nfunction createPlayerTextBox(num, initial) {\n  // Area to enter a player's name\n  let newUL = document.createElement(\"ul\");\n  newUL.classList.add(\"n-entry\");\n  let newLabel = document.createElement(\"label\");\n  newLabel.setAttribute(\"let\", `p${num}`);\n  newLabel.textContent = `Player ${num}:`;\n  newUL.appendChild(newLabel);\n  let newInput = document.createElement(\"input\");\n  newInput.setAttribute(\"type\", \"text\");\n  newInput.setAttribute(\"name\", `p${num}`);\n  newInput.setAttribute(\"id\", `p${num}`);\n  newInput.setAttribute(\"value\", initial);\n  newUL.appendChild(newInput);\n  return newUL;\n}\n\nfunction createStartButton() {\n  // Button to begin game\n  let start = document.createElement(\"button\");\n  start.setAttribute(\"class\", \"start-game\");\n  start.textContent = \"Start\";\n  return start;\n}\n\nfunction getPlayerNames() {\n  // To preserve names before wiping area\n  let name1 = document.getElementById(\"p1\").value;\n  let name2 = document.getElementById(\"p2\").value;\n  return [name1, name2];\n}\n\nfunction delNameEntry() {\n  // Deletes entire name entry area\n  document.getElementsByClassName(\"start-area\")[0].innerHTML = \"\";\n}\n\n\n//# sourceURL=webpack://battleship/./src/phases/pregame.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nconst Player = (pName, type) => {\n  let playerName = pName;\n  let playerType = type;\n  let board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n\n  const name = () => playerName;\n\n  const isComp = () => playerType;\n\n  const attack = (player, loc) => {\n    if (playerType == false) {\n      return player.board.receiveAttack(loc);\n    }\n    let success;\n    do {\n      success = player.board.receiveAttack(Math.floor(Math.random() * 100));\n    } while (success == -1);\n    return success;\n  };\n\n  // Fix this to align with the placeShip method in Gameboard,\n  // also add in random placement for computer players\n  const place = (name, size, loc, orient) => {\n    if (playerType == false) return board.placeShip(name, size, loc, orient);\n    let rLoc;\n    let rOrient;\n    do {\n      rLoc = Math.floor(Math.random() * 100);\n      rOrient = Math.floor(Math.random() * 2) == 0 ? \"h\" : \"v\";\n    } while (board.placeShip(name, size, rLoc, rOrient) == false);\n    return rLoc;\n  };\n\n  return { name, isComp, board, attack, place };\n};\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nconst Ship = (title, width) => {\n  let sName = title;\n  let hits = new Array(width).fill(0);\n\n  const name = () => sName;\n\n  const size = () => hits.length;\n\n  const hit = (loc) => {\n    if (typeof loc != \"number\" || loc < 0 || loc >= hits.length) return false;\n    hits[loc] = 1;\n    return true;\n  };\n\n  const isSunk = () => {\n    for (let i = 0; i < hits.length; i++) {\n      if (hits[i] == 0) return false;\n    }\n    return true;\n  };\n\n  return { name, size, hit, isSunk };\n};\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;