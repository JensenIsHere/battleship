const Player = (pName, playerType) => {
  playerName = pName;
  isComp = playerType;
  boardMemory = Array(10).fill(Array(10).fill(0));

  const giveName = () => playerName;

  const giveType = () => (isComp == true ? "Computer" : "Human");

  const recall = () => boardMemory;

  const scan = (board) => {
    if (isComp == false || Array.isArray(board) == false) return false;
    boardMemory = board;
    return true;
  };

  const move = () => {
    if (isComp == false) return false;
    let newMove;
    do {
      newMove = Array(2).fill(Math.floor(Math.random() * 10));
    } while (boardMemory[newMove[0]][newMove[1]] == -1);
    boardMemory[newMove[0]][newMove[1]] = -1;
    return newMove;
  };

  return { giveName, giveType, recall, scan, move };
};

module.exports = { Player: Player };
