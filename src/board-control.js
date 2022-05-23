export function makeBoard(type) {
  let newBoard = document.createElement("div");
  newBoard.setAttribute("class", "board");
  for (let i = 0; i < 100; i++) {
    let newSquare = document.createElement("div");
    newSquare.classList = `square empty ${type}`;
    newSquare.setAttribute("data-loc", i);
    newBoard.appendChild(newSquare);
  }
  return newBoard;
}

export function clearBoard(squares, type) {
  // Removes all hits, misses, and ships displayed
  for (let i = 0; i < 100; i++) {
    squares[i].className = `square empty ${type}`;
  }
}

export function showHits(squares, allShips) {
  // Shows hits on the passed board squares
  for (let i = 0; i < allShips.length; i++) {
    if (allShips[i].hit == true) {
      squares[allShips[i].loc].classList.add("hit");
      squares[allShips[i].loc].classList.remove("empty");
      squares[allShips[i].loc].classList.remove("ship-loc");
    }
  }
}

export function showShips(squares, allShips) {
  // Shows ships on the passed board squares
  for (let i = 0; i < allShips.length; i++) {
    squares[allShips[i].loc].classList.add("ship-loc");
    squares[allShips[i].loc].classList.remove("empty");
  }
}

export function showMisses(squares, misses) {
  // Shows missed shots on the passed board
  for (let i = 0; i < misses.length; i++) {
    squares[misses[i]].classList.add("miss");
    squares[misses[i]].classList.remove("empty");
  }
}

export function activateBoard(squares) {
  // Allows a player to interact with the passed board
  for (let i = 0; i < squares.length; i++) squares[i].classList.add("active");
}

export function deactivateBoard(squares) {
  // Prevents player from interacting with the passed board
  for (let i = 0; i < squares.length; i++)
    squares[i].classList.remove("active");
}

export function changeDisplayNames(name1, name2) {
  console.log(`${name1}, ${name2}`);
  let nameFields = document.querySelectorAll(".player-head");
  nameFields[0].innerHTML = name1;
  nameFields[1].innerHTML = name2;
}
