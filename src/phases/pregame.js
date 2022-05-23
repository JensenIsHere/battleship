export function createNameEntry() {
  let docFrag = document.createDocumentFragment();
  docFrag.appendChild(createPlayerTextBox("1", "Player"));
  docFrag.appendChild(createPlayerTextBox("2", "Computer"));
  docFrag.appendChild(createStartButton());
  document.getElementsByClassName("start-area")[0].appendChild(docFrag);
}

function createPlayerTextBox(num, initial) {
  let newUL = document.createElement("ul");
  newUL.classList.add("n-entry");
  let newLabel = document.createElement("label");
  newLabel.setAttribute("let", `p${num}`);
  newLabel.textContent = `Player ${num}:`;
  newUL.appendChild(newLabel);
  let newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", `p${num}`);
  newInput.setAttribute("id", `p${num}`);
  newInput.setAttribute("value", initial);
  newUL.appendChild(newInput);
  return newUL;
}

function createStartButton() {
  let start = document.createElement("button");
  start.setAttribute("class", "start-game");
  start.textContent = "Start";
  return start;
}

export function getPlayerNames() {
  let name1 = document.getElementById("p1").value;
  let name2 = document.getElementById("p2").value;
  return [name1, name2];
}

export function delNameEntry() {
  document.getElementsByClassName("start-area")[0].innerHTML = "";
}
