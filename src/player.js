const Player = (pName, playerType) => {
  playerName = pName;
  isComp = playerType;
  moves = [];

  const giveName = () => playerName;

  const giveType = () => (isComp == true ? "Computer" : "Human");

  const scan = (board) => {
    if (isComp == false) return false;
    moves = board;
    return true;
  };

  const move = () => {
    if (isComp == false) return false;
    return Array(2).fill(Math.floor(Math.random() * 10));
  };

  return { giveName, giveType, scan, move };
};

module.exports = { Player: Player };
