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

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Gameboard\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst Gameboard = () => {\n  let missList = [];\n  let ships = [];\n  let shipLoc = [];\n\n  const shipList = () => ships;\n\n  const misses = () => missList;\n\n  const allShips = () => shipLoc;\n\n  const shipAtLoc = (loc) => {\n    for (let i = 0; i < shipLoc.length; i++) {\n      if (shipLoc[i].loc == loc) return shipLoc[i].ship;\n    }\n    return -1;\n  };\n\n  const placeShip = (sName, size, loc, orient) => {\n    // Checks if ship will wrap horizontally\n    if ((loc % 10) + size - 1 > 9) return false;\n    let spaceNeeded = [];\n    for (let i = 0; i < size; i++) {\n      spaceNeeded.push(loc + (orient == \"h\" ? i : i * 10));\n      //Checks if the ship fits on board\n      if (spaceNeeded.at(-1) >= 100) return false;\n    }\n    for (let i = 0; i < shipLoc.length; i++) {\n      //Checks if another ship is in the way\n      if (spaceNeeded.indexOf(shipLoc[i].loc) != -1) return false;\n    }\n    ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(sName, size));\n    for (let i = 0; i < size; i++) {\n      shipLoc.push({\n        ship: ships.length - 1,\n        loc: spaceNeeded[i],\n        sector: i,\n        hit: false,\n      });\n    }\n    return true;\n  };\n\n  const receiveAttack = (loc) => {\n    if (loc > 99 || loc < 0) return -1;\n    for (let i = 0; i < shipLoc.length; i++) {\n      //Check to see if it hit anything\n      if (shipLoc[i].loc == loc) {\n        if (shipLoc[i].hit == true) return -1;\n        ships[shipLoc[i].ship].hit(shipLoc[i].sector);\n        shipLoc[i].hit = true;\n        return true;\n      }\n    }\n    if (missList.indexOf(loc) != -1) return -1;\n    missList.push(loc);\n    return false;\n  };\n\n  const allSunk = () => {\n    for (let i = 0; i < shipLoc.length; i++) {\n      if (shipLoc[i].hit == false) return false;\n    }\n    return true;\n  };\n\n  return {\n    shipList,\n    misses,\n    allShips,\n    shipAtLoc,\n    placeShip,\n    receiveAttack,\n    allSunk,\n  };\n};\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nconst SHIP_NAMES = [\n  \"Carrier\",\n  \"Battleship\",\n  \"Destroyer\",\n  \"Submarine\",\n  \"PT Boat\",\n];\nconst SHIP_SIZES = [5, 4, 3, 3, 2];\nconst HUMAN_SQUARES = document.getElementsByClassName(\"human\");\nconst OPP_SQUARES = document.getElementsByClassName(\"comp\");\n\nfunction gridCreator(isComp) {\n  let docFrag = document.createDocumentFragment();\n\n  for (let i = 0; i < 100; i++) {\n    let square = document.createElement(\"div\");\n    square.classList = \"square empty\";\n    square.classList.add(isComp == false ? \"human\" : \"comp\");\n    square.setAttribute(\"data-loc\", i);\n    docFrag.appendChild(square);\n  }\n  return docFrag;\n}\n\nfunction clearBoards() {\n  for (let i = 0; i < 100; i++) {\n    HUMAN_SQUARES[i].className = \"square empty human\";\n    OPP_SQUARES[i].className = \"square empty comp\";\n  }\n}\n\nfunction showHits(squares, shipList, showShips) {\n  for (let i = 0; i < shipList.length; i++) {\n    if (shipList[i].hit == true) {\n      squares[shipList[i].loc].classList.add(\"hit\");\n      squares[shipList[i].loc].classList.remove(\"empty\");\n    } else if (showShips == true) {\n      squares[shipList[i].loc].classList.add(\"ship-loc\");\n      squares[shipList[i].loc].classList.remove(\"empty\");\n    }\n  }\n}\n\nfunction showMisses(squares, missList) {\n  for (let i = 0; i < missList.length; i++) {\n    squares[missList[i]].classList.add(\"miss\");\n    squares[missList[i]].classList.remove(\"empty\");\n  }\n}\n\nfunction activateBoard(squares) {\n  for (let i = 0; i < squares.length; i++) squares[i].classList.add(\"active\");\n}\n\nfunction deactivateBoard(squares) {\n  for (let i = 0; i < squares.length; i++)\n    squares[i].classList.remove(\"active\");\n}\n\nfunction refreshBoards(hBoard, cBoard) {\n  clearBoards(HUMAN_SQUARES, OPP_SQUARES);\n  showHits(HUMAN_SQUARES, hBoard.allShips(), true);\n  showHits(OPP_SQUARES, cBoard.allShips(), false);\n  showMisses(HUMAN_SQUARES, hBoard.misses());\n  showMisses(OPP_SQUARES, cBoard.misses());\n}\n\nfunction initializeGrids() {\n  document.getElementsByClassName(\"board\")[0].appendChild(gridCreator(false));\n  document.getElementsByClassName(\"board\")[1].appendChild(gridCreator(true));\n}\n\nfunction initComp(player) {\n  let success;\n  for (let i = 0; i < SHIP_NAMES.length; i++) {\n    do {\n      success = player.place(SHIP_NAMES[i], SHIP_SIZES[i]);\n    } while ((success = false));\n  }\n}\n\nfunction initHuman(player) {\n  let locList = [3, 14, 36, 71, 80];\n  let orientList = [\"h\", \"v\", \"v\", \"h\", \"v\"];\n  for (let i = 0; i < 5; i++)\n    player.place(SHIP_NAMES[i], SHIP_SIZES[i], locList[i], orientList[i]);\n}\n\n/* Not needed yet\nfunction startPlacement(HUMAN_SQUARES) {\n  for (let i = 0; i < 100; i++) HUMAN_SQUARES[i].classList.add(\"place\");\n}\n\nfunction stopPlacement(HUMAN_SQUARES) {\n  for (let i = 0; i < 100; i++) HUMAN_SQUARES[i].classList.remove(\"place\");\n} */\n\nfunction gameStart() {\n  initializeGrids();\n  initHuman(human);\n  initComp(comp);\n  refreshBoards(human.board, comp.board);\n  deactivateBoard(HUMAN_SQUARES);\n  activateBoard(OPP_SQUARES);\n}\n\nfunction checkSunk(loc, player) {\n  if (loc > -1 && player.board.shipList()[loc].isSunk() == true) {\n    console.log(\n      `You sunk ${player.name()}'s ${player.board.shipList()[loc].name()}!`\n    );\n  }\n}\n\nfunction checkWin(pro, ant) {\n  if (ant.board.allSunk() == true) {\n    alert(`${pro.name()} wins!`);\n    return true;\n  } else return false;\n}\n\nfunction gameTurn(pro, ant, loc) {\n  pro.attack(ant, loc);\n  refreshBoards(pro.board, ant.board);\n  deactivateBoard(OPP_SQUARES);\n  let shipHit = ant.board.shipAtLoc(loc);\n  checkSunk(shipHit, ant);\n  if (checkWin(pro, ant) == false) {\n    setTimeout(() => {\n      ant.attack(pro);\n      refreshBoards(pro.board, ant.board);\n      if (checkWin(ant, pro) == false) activateBoard(OPP_SQUARES);\n    }, \"500\");\n  }\n}\n\nvar human = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)(\"Human\", false);\nvar comp = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)(\"Computer\", true);\ngameStart();\n\ndocument.addEventListener(\"click\", function (e) {\n  if (\n    e.target.classList.contains(\"active\") &&\n    e.target.classList.contains(\"empty\")\n  )\n    gameTurn(human, comp, e.target.dataset.loc);\n});\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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